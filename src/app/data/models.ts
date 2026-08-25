// Shared content shapes. These mirror what ContentService (src/app/services/content.service.ts)
// resolves from Sanity via GROQ — references and asset URLs are dereferenced in the query, so
// these interfaces stay plain values throughout, same as when this app read local JSON.

export interface TeamMember {
  /** Stable identifier for cross-referencing (e.g. case study contributors) — independent of the display name. */
  slug: string;
  name: string;
  title: string;
  credentials: string[];
  initials: string;
  linkedin?: string;
  photo?: string;
  /** Defaults to shown — set false to hide from the site without deleting the record. */
  visible?: boolean;
  /** Shown in the Home page leadership teaser. */
  featuredOnHome?: boolean;
}

export interface TestimonialCard {
  logo?: string;
  quote: string;
  name: string;
  title: string;
  letterUrl?: string;
  googleReview?: boolean;
}

export type DeliveryMode = 'Consulting' | 'R&D' | 'Product Development' | 'Training' | 'Consulting + R&D';

export interface Solution {
  title: string;
  body: string;
  deliveryMode: DeliveryMode;
  functionTags: string[];
}

export interface Pillar {
  slug: string;
  title: string;
  summary: string;
  solutions: Solution[];
  /** Falls back to the logo until content creators supply real photography. */
  image?: string;
}

// Detail-page bodies (case studies, news articles) are author-composed Portable
// Text — headings/subheadings/paragraphs are one continuous editable flow in
// Sanity Studio (different `style` values on the native `block` type), with
// images, PDFs, and callouts insertable inline as custom object types. Shared
// across every content type that has a free-form detail page, not just one.
export interface PortableTextSpan {
  _type: 'span';
  text: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _type: 'block';
  style?: 'normal' | 'h2' | 'h3';
  children: PortableTextSpan[];
}

export interface PortableTextImage {
  _type: 'image';
  url: string;
  caption?: string;
}

/** An accent-highlighted callout — e.g. a "why this matters to you" pull-out. */
export interface PortableTextCallout {
  _type: 'calloutBlock';
  heading: string;
  text: string;
}

export interface PortableTextPdf {
  _type: 'pdfBlock';
  label?: string;
  url: string;
}

export type ContentBlock = PortableTextBlock | PortableTextImage | PortableTextCallout | PortableTextPdf;

export interface CaseStudy {
  slug: string;
  /** As many as apply — the case-studies list filters by a single selected industry at a time (AND'd with technologies, if also selected). */
  industries: string[];
  /** As many as apply — filtered the same way as industries. */
  technologies: string[];
  geography: string;
  headline: string;
  /** Short teaser shown on card previews (grid, home featured) — the full story lives in `body`. */
  summary: string;
  /** Freely composed detail-page content — see ContentBlock. */
  body: ContentBlock[];
  /** Computed from the featuredContent singleton in Sanity, not a stored field — see content.service.ts. */
  featured?: boolean;
  /** Falls back to the logo until content creators supply real photography. */
  image?: string;
  /** Whoever worked on this engagement — shown on the case study page. */
  team?: TeamMember[];
}

export type NewsCategory = 'Project' | 'Partnership' | 'Speaking';

export interface NewsItem {
  slug: string;
  category: NewsCategory;
  title: string;
  date: string;
  /** Short teaser shown on card previews (list grid, featured card) — the full story lives in `body`. */
  summary: string;
  /** Freely composed detail-page content — see ContentBlock. */
  body: ContentBlock[];
  /** Computed from the featuredContent singleton in Sanity, not a stored field — see content.service.ts. */
  featured?: boolean;
  /** Falls back to the logo until content creators supply real photography. */
  image?: string;
}

export interface Office {
  name: string;
  addressLines: string[];
  hours?: string;
}
