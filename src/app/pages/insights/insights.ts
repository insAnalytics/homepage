import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { NewsCategory, NewsItem } from '../../data/models';

type Tab = 'All' | NewsCategory;

@Component({
  selector: 'app-page-insights',
  standalone: false,
  templateUrl: './insights.html',
  styleUrl: './insights.scss',
})
export class Insights implements OnInit {
  news: NewsItem[] = [];
  tabs: Tab[] = ['All', 'Project', 'Partnership', 'Speaking'];
  activeTab: Tab = 'All';
  newsletterEmail = '';
  newsletterSubmitted = false;

  constructor(private content: ContentService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // This app is zoneless — Angular has no way to know `news` changed after
    // an async HTTP response unless we explicitly tell it via detectChanges().
    this.content.getNews().subscribe((news) => {
      this.news = news;
      this.cdr.detectChanges();
    });
  }

  // This page is a general company-updates feed — a partnership, a speaking
  // engagement, or a recent development can each be the featured item, so
  // selection is by the `featured` flag, not tied to one category. It's
  // excluded from the list below so it isn't shown twice.
  get featured(): NewsItem | undefined {
    return this.news.find((n) => n.featured);
  }

  get filteredNews(): NewsItem[] {
    const rest = this.news.filter((n) => n !== this.featured);
    return this.activeTab === 'All' ? rest : rest.filter((n) => n.category === this.activeTab);
  }

  setTab(tab: Tab): void {
    this.activeTab = tab;
  }

  submitNewsletter(): void {
    // UI-only for this prototype — no backend wired up yet.
    this.newsletterSubmitted = true;
  }
}
