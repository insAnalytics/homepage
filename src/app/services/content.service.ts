import { Injectable } from '@angular/core';
import { createClient, SanityClient } from '@sanity/client';
import { Observable, from } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { CaseStudy, NewsItem, Office, Pillar, TeamMember, TestimonialCard } from '../data/models';

interface Ordered {
  _id: string;
  _createdAt: string;
}

// Every method here runs a GROQ query against Sanity, resolving every
// reference/asset to a plain value (a string, a URL, a fully-dereferenced
// object) so pages and components consume the exact same shapes they did
// when this service read local JSON — none of them know Sanity exists.
@Injectable({ providedIn: 'root' })
export class ContentService {
  private client: SanityClient = createClient(environment.sanity);
  private cache = new Map<string, Observable<unknown>>();

  getTeam(): Observable<TeamMember[]> {
    return this.load<{ members: (TeamMember & Ordered)[]; order: string[] }>(
      'team',
      `{
        "members": *[_type == "teamMember" && visible != false]{
          "slug": slug.current,
          name,
          title,
          credentials,
          initials,
          linkedin,
          "photo": photo.asset->url + "?w=200&auto=format&q=80",
          visible,
          featuredOnHome,
          _id,
          _createdAt
        },
        "order": *[_type == "displayOrder"][0].teamOrder[]->_id
      }`
    ).pipe(map(({ members, order }) => this.applyOrder(members, order)));
  }

  getPillars(): Observable<Pillar[]> {
    return this.load<{ pillars: (Pillar & Ordered)[]; order: string[] }>(
      'pillars',
      `{
        "pillars": *[_type == "pillar" && visible != false]{
          "slug": slug.current,
          title,
          summary,
          "image": image.asset->url + "?w=1600&auto=format&q=80",
          solutions[]{
            title,
            body,
            deliveryMode,
            "functionTags": coalesce(functionTags[defined(@->name)]->name, [])
          },
          _id,
          _createdAt
        },
        "order": *[_type == "displayOrder"][0].pillarOrder[]->_id
      }`
    ).pipe(map(({ pillars, order }) => this.applyOrder(pillars, order)));
  }

  getCaseStudies(): Observable<CaseStudy[]> {
    return this.load<CaseStudy[]>(
      'case-studies',
      `*[_type == "caseStudy" && visible != false]{
        "slug": slug.current,
        "industries": coalesce(industries[defined(@->name)]->name, []),
        "technologies": coalesce(technologies[defined(@->name)]->name, []),
        geography,
        headline,
        summary,
        body[]{
          ...,
          _type == "image" => { "url": asset->url + "?w=1600&auto=format&q=80", caption },
          _type == "pdfBlock" => { label, "url": file.asset->url }
        },
        "image": image.asset->url + "?w=1600&auto=format&q=80",
        "team": team[defined(@->name)]->{
          "slug": slug.current,
          name,
          title,
          credentials,
          initials,
          linkedin,
          "photo": photo.asset->url + "?w=200&auto=format&q=80"
        },
        "featured": _id == *[_type == "featuredContent"][0].caseStudy._ref
      }`
    );
  }

  getNews(): Observable<NewsItem[]> {
    return this.load<NewsItem[]>(
      'news',
      `*[_type == "newsItem" && visible != false]{
        "slug": slug.current,
        category,
        date,
        title,
        summary,
        body[]{
          ...,
          _type == "image" => { "url": asset->url + "?w=1600&auto=format&q=80", caption },
          _type == "pdfBlock" => { label, "url": file.asset->url }
        },
        "image": image.asset->url + "?w=1600&auto=format&q=80",
        "featured": _id == *[_type == "featuredContent"][0].newsItem._ref
      }`
    );
  }

  getCorporateTestimonials(): Observable<TestimonialCard[]> {
    return this.load<{ cards: (TestimonialCard & Ordered)[]; order: string[] }>(
      'testimonials-corporate',
      `{
        "cards": *[_type == "corporateTestimonial" && visible != false]{
          name,
          title,
          quote,
          "logo": logo.asset->url + "?w=440&auto=format&q=80",
          "letterUrl": letterUrl.asset->url,
          _id,
          _createdAt
        },
        "order": *[_type == "displayOrder"][0].corporateTestimonialOrder[]->_id
      }`
    ).pipe(map(({ cards, order }) => this.applyOrder(cards, order)));
  }

  getTrainingTestimonials(): Observable<TestimonialCard[]> {
    return this.load<{ cards: (TestimonialCard & Ordered)[]; order: string[] }>(
      'testimonials-training',
      `{
        "cards": *[_type == "trainingTestimonial" && visible != false]{
          name,
          title,
          quote,
          googleReview,
          _id,
          _createdAt
        },
        "order": *[_type == "displayOrder"][0].trainingTestimonialOrder[]->_id
      }`
    ).pipe(map(({ cards, order }) => this.applyOrder(cards, order)));
  }

  getOffices(): Observable<Office[]> {
    return this.load<Office[]>(
      'offices',
      `*[_type == "office"]{ name, addressLines, hours }`
    );
  }

  /** Replaces the old getSiteSettings() — the full canonical list, regardless of whether anything currently references it. */
  getIndustries(): Observable<string[]> {
    return this.load<string[]>('industries', `*[_type == "industry"] | order(name asc) .name`);
  }

  /** Replaces the old getSiteSettings() — the full canonical list, regardless of whether anything currently references it. */
  getBusinessFunctions(): Observable<string[]> {
    return this.load<string[]>('businessFunctions', `*[_type == "businessFunction"] | order(name asc) .name`);
  }

  private load<T>(cacheKey: string, groq: string): Observable<T> {
    if (!this.cache.has(cacheKey)) {
      this.cache.set(cacheKey, from(this.client.fetch<T>(groq)).pipe(shareReplay(1)));
    }
    return this.cache.get(cacheKey)! as Observable<T>;
  }

  /**
   * Sorts by the Display Order singleton's array of IDs; anything not yet
   * added to that list (e.g. a just-created record) is appended at the end
   * by creation date rather than silently vanishing.
   */
  private applyOrder<T extends Ordered>(items: T[], order: string[]): T[] {
    const position = new Map(order.map((id, index) => [id, index]));
    return [...items].sort((a, b) => {
      const posA = position.has(a._id) ? position.get(a._id)! : Infinity;
      const posB = position.has(b._id) ? position.get(b._id)! : Infinity;
      if (posA !== posB) return posA - posB;
      return a._createdAt.localeCompare(b._createdAt);
    });
  }
}
