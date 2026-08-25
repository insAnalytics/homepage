import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Capabilities } from './pages/capabilities/capabilities';
import { CaseStudies } from './pages/case-studies/case-studies';
import { CaseStudyDetail } from './pages/case-study-detail/case-study-detail';
import { Insights } from './pages/insights/insights';
import { NewsDetail } from './pages/news-detail/news-detail';
import { About } from './pages/about/about';
import { ContactPage } from './pages/contact-page/contact-page';

const routes: Routes = [
  { path: '', component: Home },
  { path: 'capabilities', component: Capabilities },
  { path: 'case-studies', component: CaseStudies },
  { path: 'case-studies/:slug', component: CaseStudyDetail },
  { path: 'insights', component: Insights },
  { path: 'insights/:slug', component: NewsDetail },
  { path: 'about', component: About },
  { path: 'contact', component: ContactPage },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
