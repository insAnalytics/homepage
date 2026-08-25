import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';

import { App } from './app';
import { AppRoutingModule } from './app-routing-module';
import { Navbar } from './components/navbar/navbar';
import { Banner } from './components/banner/banner';
import { Hero } from './components/hero/hero';
import { StatsStrip } from './components/stats-strip/stats-strip';
import { BatFramework } from './components/bat-framework/bat-framework';
import { Expertise } from './components/expertise/expertise';
import { Team } from './components/team/team';
import { TestimonialsCorporate } from './components/testimonials-corporate/testimonials-corporate';
import { TestimonialsTraining } from './components/testimonials-training/testimonials-training';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';

import { Home } from './pages/home/home';
import { Capabilities } from './pages/capabilities/capabilities';
import { CaseStudies } from './pages/case-studies/case-studies';
import { CaseStudyDetail } from './pages/case-study-detail/case-study-detail';
import { Insights } from './pages/insights/insights';
import { NewsDetail } from './pages/news-detail/news-detail';
import { About } from './pages/about/about';
import { ContactPage } from './pages/contact-page/contact-page';

@NgModule({
  declarations: [
    App,
    Navbar,
    Banner,
    Hero,
    StatsStrip,
    BatFramework,
    Expertise,
    Team,
    TestimonialsCorporate,
    TestimonialsTraining,
    Contact,
    Footer,
    Home,
    Capabilities,
    CaseStudies,
    CaseStudyDetail,
    Insights,
    NewsDetail,
    About,
    ContactPage,
  ],
  imports: [BrowserModule, CommonModule, FormsModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners(), provideHttpClient()],
  bootstrap: [App],
})
export class AppModule {}
