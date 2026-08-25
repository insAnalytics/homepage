import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss',
})
export class App implements AfterViewInit, OnDestroy {
  private intersectionObserver?: IntersectionObserver;
  private mutationObserver?: MutationObserver;

  constructor(router: Router) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo({ top: 0 });
      }
    });
  }

  ngAfterViewInit() {
    this.intersectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('visible');
      }),
      { threshold: 0.08 }
    );

    // Most page content (pillars, case studies, news, team) renders after an
    // async HTTP fetch resolves, well after the initial view is ready — so a
    // one-time scan for .fade-up elements would miss them and leave them
    // permanently invisible. Watch the DOM instead of guessing a timing.
    this.mutationObserver = new MutationObserver(() => this.observeFadeUps());
    this.mutationObserver.observe(document.body, { childList: true, subtree: true });

    this.observeFadeUps();
  }

  ngOnDestroy() {
    this.mutationObserver?.disconnect();
    this.intersectionObserver?.disconnect();
  }

  private observeFadeUps() {
    document.querySelectorAll('.fade-up:not(.visible)').forEach((el) => this.intersectionObserver!.observe(el));
  }
}
