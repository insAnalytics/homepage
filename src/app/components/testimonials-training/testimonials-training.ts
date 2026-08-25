import { ChangeDetectorRef, Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { ContentService } from '../../services/content.service';
import { TestimonialCard } from '../../data/models';

@Component({
  selector: 'app-testimonials-training',
  standalone: false,
  templateUrl: './testimonials-training.html',
  styleUrl: './testimonials-training.scss',
})
export class TestimonialsTraining implements OnInit, OnDestroy {
  @ViewChild('swiperEl') swiperRef!: ElementRef<HTMLElement>;
  @ViewChild('prevBtn') prevRef!: ElementRef<HTMLElement>;
  @ViewChild('nextBtn') nextRef!: ElementRef<HTMLElement>;

  private swiper!: Swiper;

  cards: TestimonialCard[] = [];

  constructor(private content: ContentService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.content.getTrainingTestimonials().subscribe((cards) => {
      this.cards = cards;
      // Force the *ngFor slides into the DOM synchronously before Swiper reads
      // them — a setTimeout(0) here races Angular's async change detection and
      // can initialize Swiper against an empty wrapper.
      this.cdr.detectChanges();
      this.swiper = new Swiper(this.swiperRef.nativeElement, {
        modules: [Navigation, Pagination],
        spaceBetween: 24,
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: true,
        navigation: {
          prevEl: this.prevRef.nativeElement,
          nextEl: this.nextRef.nativeElement,
        },
        pagination: {
          el: '.tt__pagination',
          clickable: true,
        },
        breakpoints: {
          768:  { slidesPerView: 2, slidesPerGroup: 2 },
          1024: { slidesPerView: 3, slidesPerGroup: 3 },
        },
      });
    });
  }

  ngOnDestroy(): void {
    if (this.swiper) this.swiper.destroy(true, true);
  }
}
