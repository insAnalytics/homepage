import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

interface TestiCard {
  logo: string;
  quote: string;
  name: string;
  title: string;
}

@Component({
  selector: 'app-testimonials-corporate',
  standalone: false,
  templateUrl: './testimonials-corporate.html',
  styleUrl: './testimonials-corporate.scss',
})
export class TestimonialsCorporate implements AfterViewInit, OnDestroy {
  @ViewChild('swiperEl') swiperRef!: ElementRef<HTMLElement>;
  @ViewChild('prevBtn') prevRef!: ElementRef<HTMLElement>;
  @ViewChild('nextBtn') nextRef!: ElementRef<HTMLElement>;

  private swiper!: Swiper;

  cards: TestiCard[] = [
    {
      logo: 'assets/logos/clients/numerify.png',
      quote: '"insAnalytics built and operationalized the models for us and they are now core parts of our product offering, successfully deployed at our customers including a few Fortune 25 customers. They have shown great technical competence, but more importantly helped us frame the solution in a way that adds true value. They have met their commitments in terms of timelines and completeness of solution."',
      name: 'Numerify Inc.',
      title: 'San Jose, USA',
    },
    {
      logo: 'assets/logos/clients/mjunction.png',
      quote: '"The assignments were successfully completed: Tea Auction Price Prediction — based on which mJunction selected us out of many for a subsequent visual analytics assignment — and a Tableau-based visual analytics dashboard for our loyalty program. We look forward to working with you in future."',
      name: 'Amit Khan',
      title: 'Chief Information Officer, mJunction, India',
    },
    {
      logo: 'assets/logos/clients/neeri.png',
      quote: '"insAnalytics performed very well in meeting the objectives set out for the workshop and created huge interest in our scientists in implementing machine learning algorithms in their respective areas. Post the session, our top management and scientists had an in-depth discussion with the insAnalytics team — the session was really fruitful. We look forward to a much stronger association."',
      name: 'Dr. Sunil Kumar',
      title: 'Senior Scientist, CSIR-NEERI, Nagpur',
    },
    {
      logo: 'assets/logos/clients/imi.png',
      quote: '"For the last three years insAnalytics has been engaged by IMI Kolkata to train our PGDM students on Data Analytics, Visual Analytics, RPA, Digital Marketing, and Sentiment Analysis. The knowledge and skills enhanced through these workshops have been evidenced during final presentations and corroborated by feedback from industry."',
      name: 'Dr. Mohua Banerjee',
      title: 'Dean – Placements & Professor of Marketing, IMI Kolkata',
    },
    {
      logo: 'assets/logos/clients/vnit.png',
      quote: '"insAnalytics brought very senior industry experts to conduct this workshop. Senior Industry Professionals, Research Scholars, and Faculty members across the country attended and found it to be value adding and relevant. insAnalytics has created a mark in our institute and we will be happy to engage them for any future need."',
      name: 'Dr. Abhay Gandhi',
      title: 'Professor & HoD, Dept. of Electronics & Communication Engg., VNIT Nagpur',
    },
    {
      logo: 'assets/logos/clients/erevmax.png',
      quote: '"After evaluating several Corporate Training service providers in Kolkata and Bangalore, we selected insAnalytics. I am thankful for conducting a very effective program that enabled our employees to become hands-on and proficient in applying Big Data skills within a quick time. I would highly recommend their services."',
      name: 'Udai Solanki',
      title: 'MD & CTO, eRevMax, India',
    },
    {
      logo: 'assets/logos/clients/aim.png',
      quote: '"Training sessions conducted by insAnalytics\' esteemed faculty — comprising industry experts with decades of domain knowledge — led to a significant enhancement in skill levels and domain awareness of our students, exemplified by the strong 100% placement experienced by AIM Kolkata participants."',
      name: 'Maj Gen (Dr.) SC Jain, VSM (Retd.)',
      title: 'Director, Army Institute of Management, Kolkata',
    },
    {
      logo: 'assets/logos/clients/assam-university.png',
      quote: '"Working in the domain of Machine Learning and Analytics at insAnalytics is the most beneficial experience of our students. They have gained professional connections, career skills, and new technological knowledge — and have encouraged us to continue this association."',
      name: 'Dr. Tapodhir Acharjee',
      title: 'Head, Dept. of Computer Science & Engineering, Assam University, Silchar',
    },
  ];

  ngAfterViewInit(): void {
    // setTimeout defers init by one tick so *ngFor slides are fully in the DOM
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
          el: '.tc__pagination',
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

  onLogoError(event: Event): void {
    (event.target as HTMLImageElement).style.display = 'none';
  }
}
