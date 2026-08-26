import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { ContentService } from '../../services/content.service';
import { CaseStudy, Pillar, TeamMember } from '../../data/models';

@Component({
  selector: 'app-page-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  pillars: Pillar[] = [];
  featuredCase?: CaseStudy;
  leadershipTeaser: TeamMember[] = [];

  @ViewChild('outcomesSwiperEl') outcomesSwiperEl?: ElementRef<HTMLElement>;
  @ViewChild('outcomesPrevBtn') outcomesPrevBtn?: ElementRef<HTMLElement>;
  @ViewChild('outcomesNextBtn') outcomesNextBtn?: ElementRef<HTMLElement>;

  private outcomesSwiper?: Swiper;

  constructor(private content: ContentService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // This app is zoneless — Angular has no way to know these fields changed
    // after an async HTTP response unless we explicitly tell it via
    // detectChanges().
    this.content.getPillars().subscribe((pillars) => {
      this.pillars = pillars;
      this.cdr.detectChanges();
      this.initOutcomesSwiper();
    });
    this.content.getCaseStudies().subscribe((cases) => {
      this.featuredCase = cases.find((c) => c.featured) ?? cases[0];
      this.cdr.detectChanges();
    });
    this.content.getTeam().subscribe((team) => {
      this.leadershipTeaser = team.filter((member) => member.featuredOnHome);
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.outcomesSwiper?.destroy(true, true);
  }

  private initOutcomesSwiper(): void {
    if (!this.outcomesSwiperEl || !this.outcomesPrevBtn || !this.outcomesNextBtn) return;
    this.outcomesSwiper = new Swiper(this.outcomesSwiperEl.nativeElement, {
      modules: [Navigation, Pagination],
      spaceBetween: 24,
      slidesPerView: 1,
      slidesPerGroup: 1,
      navigation: {
        prevEl: this.outcomesPrevBtn.nativeElement,
        nextEl: this.outcomesNextBtn.nativeElement,
      },
      pagination: {
        el: '.outcomes__pagination',
        clickable: true,
      },
      breakpoints: {
        768: { slidesPerView: 2, slidesPerGroup: 2 },
        1024: { slidesPerView: 3, slidesPerGroup: 3 },
      },
    });
  }
}
