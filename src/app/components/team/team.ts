import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

export interface TeamMember {
  name: string;
  title: string;
  credentials: string[];
  initials: string;
}

@Component({
  selector: 'app-team',
  standalone: false,
  templateUrl: './team.html',
  styleUrl: './team.scss',
})
export class Team implements AfterViewInit, OnDestroy {
  @ViewChild('swiperEl') swiperRef!: ElementRef<HTMLElement>;
  @ViewChild('prevBtn') prevRef!: ElementRef<HTMLElement>;
  @ViewChild('nextBtn') nextRef!: ElementRef<HTMLElement>;

  private swiper!: Swiper;

  members: TeamMember[] = [
    {
      name: 'Dr. Goutam Das',
      title: 'Founder & Principal Data Scientist',
      initials: 'GD',
      credentials: [
        '30+ years across Finance, Energy, Telecom, Manufacturing',
        'Chief Data Scientist, Ministry of Power, Govt. of India',
        'Global Head Analytics Consulting, TCS | Senior Data Scientist, IBM',
        'PhD IIFT Delhi | M.Tech IIT Kharagpur | Six Sigma MBB, ISI Delhi',
      ],
    },
    {
      name: 'Prof. (Dr.) B B Chakraborty',
      title: 'Advisor',
      initials: 'BC',
      credentials: [
        '40+ years in Industry and Academics',
        'Senior Professor & Director, IIM Calcutta & IIM Ranchi',
        'Consultant: UN, HSBC, Deutsche Bank, Credit Suisse, ONGC',
        'PhD Economics | MBA Gold Medalist, IIM Calcutta | BE Gold Medalist, Jadavpur',
      ],
    },
    {
      name: 'Dr. Nidhan Choudhuri',
      title: 'Advisor',
      initials: 'NC',
      credentials: [
        '25+ years in Quantitative Finance & Algorithmic Trading',
        'Financial Analyst, Barclays Capital & Morgan Stanley, New York',
        'Professor, University of Michigan & Case Western Reserve University',
        'PhD Statistics, Michigan State | M.Stat & B.Stat, ISI',
      ],
    },
    {
      name: 'Mr. Jayanta Adhikari',
      title: 'Chief Consultant, Financial Analytics',
      initials: 'JA',
      credentials: [
        '30+ years across BFSI, Retail, Manufacturing',
        'Reduced Fortune 500 client\'s financial book closure cycle from 45 days to 15 days',
        'Head of Financial Analytics & Business Analytics, TCS',
        'Expertise: FP&A, Demand Planning, Customer Analytics',
        'CFA Level 2 | SMP IIM Calcutta | B.Tech IIT BHU',
      ],
    },
    {
      name: 'Dr. Ayan Chatterjee',
      title: 'Chief Technology Officer',
      initials: 'AC',
      credentials: [
        'GPU architecture design at NVIDIA (Tesla autonomous vehicles)',
        'AI platforms for Drug Discovery at AstraZeneca',
        'Expertise: GenAI, NLP, Graph ML, Computer Vision, AI Hardware',
        'PhD CS, Northeastern University Boston | M.Tech IISc Bangalore',
      ],
    },
    {
      name: 'Mr. Pavan Goyal',
      title: 'Consultant, Financial Analytics',
      initials: 'PG',
      credentials: [
        '19+ years in Power Sector and Finance',
        'Ex-Vice President, Credit Suisse & J.P. Morgan',
        'Expertise: Derivatives Strategy, Proprietary Trading, Risk Analytics',
        'PhD Scholar IIM Indore | MBA Finance IIM Lucknow | B.Tech MNIT Jaipur',
      ],
    },
    {
      name: 'Mr. Hridam Basu',
      title: 'Sr. Consultant, AI/GenAI & Blockchain',
      initials: 'HB',
      credentials: [
        '8+ years in AI/GenAI, Cryptography, Blockchain & Decentralized Networks',
        'Cryptography roles at Ethereum Foundation, Aztec Protocol, Polygon, Neptune Cash',
        'Research Intern at TCS Innovation Labs, AT&T Labs, NTT Labs, ISI Kolkata',
        'MS Computer Science, Northeastern University Boston | BE IT, Jadavpur University',
      ],
    },
    {
      name: 'Mr. Abhishek Ranjan',
      title: 'Chief Business Officer',
      initials: 'AR',
      credentials: [
        '19+ years across Technology, Power, Real Estate, Retail, Hospitality',
        'Expertise: Business Strategy, Client Relationship, Asset Monetization',
        'MBA Power Management, NPTI | BE Electronics, BIT Sindri',
      ],
    },
    {
      name: 'Ms. Amrita Saha',
      title: 'Sr. Data Scientist, AI-ML & Statistical & Econometrics Modeling',
      initials: 'AS',
      credentials: [
        '15 years in AI, GenAI, Big Data Analytics, RPA',
        'Expertise: Statistical Modeling, Time Series, Panel Data Regression',
        'Sectors: BFSI, Energy/Utility, Manufacturing',
        'PhD Scholar (AI in Energy Economics) BITS Pilani | M.Tech Data Science, BITS Pilani',
      ],
    },
    {
      name: 'Mr. Gautam Mukherjee',
      title: 'Management Consultant',
      initials: 'GM',
      credentials: [
        '30+ years R&D and leadership at DRDO, Reliance, Capgemini, Tech Mahindra',
        'Expertise: Strategic Management, Program Management, Defense, Telecom',
        'M.Tech Electrical Engineering, IIT Madras | B.Tech IIT Kharagpur',
      ],
    },
    {
      name: 'Mr. Kaustav Chakraborty',
      title: 'Consultant, IT Architecture, Blockchain & Cloud',
      initials: 'KC',
      credentials: [
        '20+ years in Enterprise Architecture, Blockchain, Microservices, IoT',
        'Expertise: Real-time Data Processing, Cloud, DevOps, Embedded Systems',
        'B.Tech Electronics & Instrumentation, WBUT',
      ],
    },
    {
      name: 'Mr. Aditya Biswas',
      title: 'Consultant, Industrial Engineering & Analytics',
      initials: 'AB',
      credentials: [
        '30+ years in IT, Analytics, Banking & Insurance, Manufacturing',
        'Ex-Principal Consultant TCS | Head of IT, Allahabad Bank',
        'Associate Professor of Quantitative Management, NITIE Mumbai',
        'M.Tech Industrial Engineering & OR, IIT Kharagpur',
      ],
    },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
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
    }, 0);
  }

  ngOnDestroy(): void {
    if (this.swiper) this.swiper.destroy(true, true);
  }
}
