import { ChangeDetectorRef, Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { ContentService } from '../../services/content.service';
import { Pillar, Solution } from '../../data/models';

interface TaggedSolution extends Solution {
  pillarTitle: string;
}

@Component({
  selector: 'app-page-capabilities',
  standalone: false,
  templateUrl: './capabilities.html',
  styleUrl: './capabilities.scss',
})
export class Capabilities implements OnInit, AfterViewInit, OnDestroy {
  pillars: Pillar[] = [];

  expandedSlug: string | null = null;
  activeTag: string | null = null;
  filteredSolutions: TaggedSolution[] = [];
  hideSidebarCta = false;

  private footerObserver?: IntersectionObserver;

  @ViewChild('pillarsSwiperEl') pillarsSwiperEl?: ElementRef<HTMLElement>;
  @ViewChild('pillarsPrevBtn') pillarsPrevBtn?: ElementRef<HTMLElement>;
  @ViewChild('pillarsNextBtn') pillarsNextBtn?: ElementRef<HTMLElement>;

  @ViewChild('solutionsSwiperEl') solutionsSwiperEl?: ElementRef<HTMLElement>;
  @ViewChild('solutionsPrevBtn') solutionsPrevBtn?: ElementRef<HTMLElement>;
  @ViewChild('solutionsNextBtn') solutionsNextBtn?: ElementRef<HTMLElement>;

  @ViewChild('expandedSwiperEl') expandedSwiperEl?: ElementRef<HTMLElement>;
  @ViewChild('expandedPrevBtn') expandedPrevBtn?: ElementRef<HTMLElement>;
  @ViewChild('expandedNextBtn') expandedNextBtn?: ElementRef<HTMLElement>;

  private pillarsSwiper?: Swiper;
  private solutionsSwiper?: Swiper;
  private expandedSwiper?: Swiper;

  constructor(private content: ContentService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.content.getPillars().subscribe((pillars) => {
      this.pillars = pillars;
      // Force the *ngFor slides into the DOM synchronously before Swiper reads
      // them — a setTimeout(0) here races Angular's async change detection and
      // can initialize Swiper against an empty wrapper.
      this.cdr.detectChanges();
      this.initPillarsSwiper();
      this.refreshFilteredSolutions();
      // If a fragment (e.g. from a Home outcome card) resolved before this
      // HTTP response, expandedSlug is already set but the swiper couldn't
      // init yet since the panel had nothing to expand into.
      if (this.expandedSlug) this.initExpandedSwiper();
    });
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        this.expandedSlug = fragment;
        this.cdr.detectChanges();
        this.initExpandedSwiper();
      }
    });
  }

  ngAfterViewInit(): void {
    // The floating CTA is fixed to the viewport, which puts it on top of the
    // footer once that scrolls into view. Hide it while the footer is visible
    // so it doesn't sit awkwardly over the footer content.
    const footer = document.querySelector('app-footer');
    if (!footer) return;
    this.footerObserver = new IntersectionObserver(
      ([entry]) => {
        this.hideSidebarCta = entry.isIntersecting;
        this.cdr.detectChanges();
      },
      { threshold: 0 }
    );
    this.footerObserver.observe(footer);
  }

  ngOnDestroy(): void {
    this.pillarsSwiper?.destroy(true, true);
    this.solutionsSwiper?.destroy(true, true);
    this.expandedSwiper?.destroy(true, true);
    this.footerObserver?.disconnect();
  }

  get expandedPillar(): Pillar | undefined {
    return this.pillars.find((p) => p.slug === this.expandedSlug);
  }

  // Derived from whatever function tags are actually used across solutions,
  // same as the industry/technology filters on the Case Studies page —
  // tagging a solution is the only action a content editor needs to take
  // for it to show up here, no separate list to keep in sync.
  get functionTags(): string[] {
    return [...new Set(this.pillars.flatMap((p) => p.solutions.flatMap((s) => s.functionTags)))];
  }

  toggleExpanded(slug: string): void {
    this.expandedSlug = this.expandedSlug === slug ? null : slug;

    this.expandedSwiper?.destroy(true, true);
    this.expandedSwiper = undefined;

    if (this.expandedSlug) {
      this.cdr.detectChanges();
      this.initExpandedSwiper();
    }
  }

  setActiveTag(tag: string): void {
    this.activeTag = this.activeTag === tag ? null : tag;
    this.refreshFilteredSolutions();
  }

  clearFilter(): void {
    this.activeTag = null;
    this.refreshFilteredSolutions();
  }

  private refreshFilteredSolutions(): void {
    this.solutionsSwiper?.destroy(true, true);
    this.solutionsSwiper = undefined;

    const allSolutions = this.pillars.flatMap((pillar) =>
      pillar.solutions.map((solution) => ({ ...solution, pillarTitle: pillar.title }))
    );

    this.filteredSolutions = this.activeTag
      ? allSolutions.filter((solution) => solution.functionTags.includes(this.activeTag!))
      : allSolutions;

    this.cdr.detectChanges();
    this.initSolutionsSwiper();
  }

  private initPillarsSwiper(): void {
    if (!this.pillarsSwiperEl || !this.pillarsPrevBtn || !this.pillarsNextBtn) return;
    this.pillarsSwiper = new Swiper(this.pillarsSwiperEl.nativeElement, {
      modules: [Navigation, Pagination],
      spaceBetween: 24,
      slidesPerView: 1,
      slidesPerGroup: 1,
      navigation: {
        prevEl: this.pillarsPrevBtn.nativeElement,
        nextEl: this.pillarsNextBtn.nativeElement,
      },
      pagination: {
        el: '.capabilities__pillars-pagination',
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2, slidesPerGroup: 2 },
        1024: { slidesPerView: 3, slidesPerGroup: 3 },
      },
    });
  }

  private initExpandedSwiper(): void {
    if (!this.expandedSwiperEl || !this.expandedPrevBtn || !this.expandedNextBtn || !this.expandedPillar?.solutions.length) return;
    this.expandedSwiper = new Swiper(this.expandedSwiperEl.nativeElement, {
      modules: [Navigation, Pagination],
      spaceBetween: 24,
      slidesPerView: 1,
      slidesPerGroup: 1,
      navigation: {
        prevEl: this.expandedPrevBtn.nativeElement,
        nextEl: this.expandedNextBtn.nativeElement,
      },
      pagination: {
        el: '.capabilities__expanded-pagination',
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2, slidesPerGroup: 2 },
        1024: { slidesPerView: 3, slidesPerGroup: 3 },
      },
    });
  }

  private initSolutionsSwiper(): void {
    if (!this.solutionsSwiperEl || !this.solutionsPrevBtn || !this.solutionsNextBtn || !this.filteredSolutions.length) return;
    this.solutionsSwiper = new Swiper(this.solutionsSwiperEl.nativeElement, {
      modules: [Navigation, Pagination],
      spaceBetween: 24,
      slidesPerView: 1,
      slidesPerGroup: 1,
      loop: this.filteredSolutions.length > 3,
      navigation: {
        prevEl: this.solutionsPrevBtn.nativeElement,
        nextEl: this.solutionsNextBtn.nativeElement,
      },
      pagination: {
        el: '.capabilities__solutions-pagination',
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2, slidesPerGroup: 2 },
        1024: { slidesPerView: 3, slidesPerGroup: 3 },
      },
    });
  }
}
