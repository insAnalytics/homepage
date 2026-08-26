import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Capabilities } from './pages/capabilities/capabilities';
import { CaseStudies } from './pages/case-studies/case-studies';
import { CaseStudyDetail } from './pages/case-study-detail/case-study-detail';
import { About } from './pages/about/about';
import { ContactPage } from './pages/contact-page/contact-page';

// Insights & News is temporarily off this build — not enough real content
// yet to publish. The wildcard route below already sends /insights and
// /insights/:slug (and anything else) back to Home.
const routes: Routes = [
  { path: '', component: Home },
  { path: 'capabilities', component: Capabilities },
  { path: 'case-studies', component: CaseStudies },
  { path: 'case-studies/:slug', component: CaseStudyDetail },
  { path: 'about', component: About },
  { path: 'contact', component: ContactPage },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
