import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

interface TrainCard {
  quote: string;
  name: string;
  title: string;
  googleReview?: boolean;
}

@Component({
  selector: 'app-testimonials-training',
  standalone: false,
  templateUrl: './testimonials-training.html',
  styleUrl: './testimonials-training.scss',
})
export class TestimonialsTraining implements AfterViewInit, OnDestroy {
  @ViewChild('swiperEl') swiperRef!: ElementRef<HTMLElement>;
  @ViewChild('prevBtn') prevRef!: ElementRef<HTMLElement>;
  @ViewChild('nextBtn') nextRef!: ElementRef<HTMLElement>;

  private swiper!: Swiper;

  cards: TrainCard[] = [
    {
      quote: '"Talented and industry-experienced professionals who trained us on Business Analytics and Predictive Modeling, including basics of statistical concepts as well as practical exposure to data. The professors are cooperative and always tried to clear all my doubts. It has been a very educational journey learning in every aspect of my field and exploring it to the fullest."',
      name: 'Manisha Kapoor',
      title: 'Research Analyst, McKinsey & Co.',
    },
    {
      quote: '"Its a wonderful organisation to learn with very helpful guidance. They take personal care to guide as per industry-specific domain in data analytics. I recommend students or professionals interested in data science to choose insAnalytics as their best guide."',
      name: 'Debarshi Sanyal',
      title: 'Process Engineer, Worley Parsons, Oman',
      googleReview: true,
    },
    {
      quote: '"Professional and knowledgeable expertise, very friendly and cooperative environment. Best part of the Big Data course is I got the flavour of working on a live project."',
      name: 'Piyali Chakraborty',
      title: 'Research Associate, IIT Kharagpur',
    },
    {
      quote: '"No matter you are a fresher or an experienced professional, you will be treated equally with ample amount of time. The class environment is very friendly and you can ask any question. The class material and the hands-on are extensive and well planned."',
      name: 'Kaushik Ghosh',
      title: 'USA-based IT Consultant, American Express',
    },
    {
      quote: '"Been here for 2 months — it has been a very educational journey learning in every aspect of my field and exploring it to the fullest. insAnalytics gets the credit for the amazing working and learning atmosphere. My intellectual growth is all credit to them."',
      name: 'Kumar Yashaswi',
      title: 'Quant Goldman Sachs, IIT Kharagpur — Intern, insAnalytics',
    },
    {
      quote: '"The organization has excellent faculty who take great care in explaining the concepts. They also provide very good study materials covering all the details. Class times are flexible — I was in Kolkata for a short duration and they designed the course so I could complete it within the stipulated time. The practical hands-on sessions also help greatly."',
      name: 'Sayantan Das',
      title: 'MBA 1st Year, IIT Mumbai',
    },
    {
      quote: '"I am part of a core Machine Learning infrastructure team with about 12 years of experience. insAnalytics changed my approach towards finding solutions — earlier we used to implement ML algorithms mechanically without knowing the underlying concepts. They corrected that fundamentally."',
      name: 'Sunil Nadumuthlu',
      title: 'Data Scientist, USA',
    },
    {
      quote: '"I attended a 3-day workshop on Business Analytics conducted by insAnalytics. The take-away was a lot more than expected. The sessions were crisp and exhaustive with in-depth coverage. The faculty was impressively interested in the audience and tailored the experience as much as possible."',
      name: 'Ankush Jacob',
      title: 'Machine Learning Engineer',
    },
    {
      quote: '"I would like to thank insAnalytics for the opportunity to pursue my 3rd year BTech mandatory industrial internship under the guidance of Dr. Goutam Das on two contemporary topics — Virtual Power Plant feasibility in the Indian context, and Industrial application of GenAI."',
      name: 'Rishav Chatterjee',
      title: 'BTech Civil Engineering 2022–26, IIT Bombay',
    },
    {
      quote: '"I have been working here as an intern for the past month. The experience so far is excellent. I had very little knowledge of Data Analytics and Machine Learning before, but after coming here the faculty helped lay a clear path to prosper in the field. Their teaching material helped in grasping the various concepts and they are always there to clear your doubts."',
      name: 'Agnibha Roy',
      title: 'Dept. of Mechanical Engineering, IIT Kharagpur',
      googleReview: true,
    },
    {
      quote: '"My experience with insAnalytics is awesome. I came for Data Analysis support and within 24 hours extensive analysis of the data was done to my satisfaction. I am going to enroll further for courses to upgrade myself."',
      name: 'Sayan Chatterjee',
      title: 'Regional Manager & Head East, Tata Communications',
      googleReview: true,
    },
    {
      quote: '"A place to learn, a place to grow, a place to create what you dream."',
      name: 'Amartya Kumar',
      title: 'Summer Intern (IIT Kharagpur, EE) 2018',
      googleReview: true,
    },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
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
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.swiper) this.swiper.destroy(true, true);
  }
}
