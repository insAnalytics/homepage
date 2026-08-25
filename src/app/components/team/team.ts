import { ChangeDetectorRef, Component, OnDestroy, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { ContentService } from '../../services/content.service';
import { TeamMember } from '../../data/models';

@Component({
  selector: 'app-team',
  standalone: false,
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team implements OnInit, OnDestroy {
  @Input() layout: 'carousel' | 'grid' = 'carousel';
  @Input() limit?: number;

  @ViewChild('swiperEl') swiperRef?: ElementRef<HTMLElement>;
  @ViewChild('prevBtn') prevRef?: ElementRef<HTMLElement>;
  @ViewChild('nextBtn') nextRef?: ElementRef<HTMLElement>;

  private swiper?: Swiper;

  members: TeamMember[] = [];

  constructor(private content: ContentService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // This app is zoneless — Angular has no way to know `members` changed
    // after an async HTTP response unless we explicitly tell it via
    // detectChanges(). That same call also guarantees the *ngFor slides are
    // in the DOM before Swiper reads them, for the carousel layout.
    this.content.getTeam().subscribe((members) => {
      const visibleMembers = members.filter((member) => member.visible !== false);
      this.members = this.limit ? visibleMembers.slice(0, this.limit) : visibleMembers;
      this.cdr.detectChanges();
      if (this.layout === 'carousel') {
        this.initSwiper();
      }
    });
  }

  private initSwiper(): void {
    if (!this.swiperRef || !this.prevRef || !this.nextRef) return;
    this.swiper = new Swiper(this.swiperRef.nativeElement, {
      modules: [Navigation, Pagination],
      spaceBetween: 28,
      slidesPerView: 1,
      slidesPerGroup: 1,
      loop: true,
      navigation: {
        prevEl: this.prevRef.nativeElement,
        nextEl: this.nextRef.nativeElement,
      },
      pagination: {
        el: '.team__pagination',
        clickable: true,
      },
      breakpoints: {
        768:  { slidesPerView: 2, slidesPerGroup: 2 },
        1024: { slidesPerView: 4, slidesPerGroup: 4 },
      },
    });
  }

  ngOnDestroy(): void {
    if (this.swiper) this.swiper.destroy(true, true);
  }
}
