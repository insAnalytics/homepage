import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContentService } from '../../services/content.service';
import { NewsItem, PortableTextBlock } from '../../data/models';
import { renderPortableTextSpans } from '../../shared/portable-text';

@Component({
  selector: 'app-page-news-detail',
  standalone: false,
  templateUrl: './news-detail.html',
  styleUrl: './news-detail.scss',
})
export class NewsDetail implements OnInit {
  newsItem?: NewsItem;
  notFound = false;

  constructor(private route: ActivatedRoute, private content: ContentService, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    // This app is zoneless — Angular has no way to know these fields changed
    // after an async HTTP response unless we explicitly tell it via
    // detectChanges().
    this.content.getNews().subscribe((news) => {
      this.newsItem = news.find((n) => n.slug === slug);
      this.notFound = !this.newsItem;
      this.cdr.detectChanges();
    });
  }

  // <iframe [src]> requires an explicitly-trusted SafeResourceUrl — binding
  // the raw string leaves Angular's sanitizer blocking it.
  safeUrl(src: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(src);
  }

  renderText(block: PortableTextBlock): string {
    return renderPortableTextSpans(block);
  }
}
