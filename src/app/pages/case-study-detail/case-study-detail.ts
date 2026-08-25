import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContentService } from '../../services/content.service';
import { CaseStudy, PortableTextBlock } from '../../data/models';
import { renderPortableTextSpans } from '../../shared/portable-text';

@Component({
  selector: 'app-page-case-study-detail',
  standalone: false,
  templateUrl: './case-study-detail.html',
  styleUrl: './case-study-detail.scss',
})
export class CaseStudyDetail implements OnInit {
  caseStudy?: CaseStudy;
  notFound = false;

  constructor(
    private route: ActivatedRoute,
    private content: ContentService,
    private cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    // This app is zoneless — Angular has no way to know these fields changed
    // after an async HTTP response unless we explicitly tell it via
    // detectChanges(). caseStudy.team already arrives fully resolved (Sanity
    // dereferences the references in the query), so there's no second fetch
    // needed here the way there was when team was just an array of slugs.
    this.content.getCaseStudies().subscribe((cases) => {
      this.caseStudy = cases.find((c) => c.slug === slug);
      this.notFound = !this.caseStudy;
      this.cdr.detectChanges();
    });
  }

  // <iframe [src]> requires an explicitly-trusted SafeResourceUrl — binding
  // the raw string leaves Angular's sanitizer blocking it. Each pdf block
  // gets its own, since a body can embed more than one.
  safeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  renderText(block: PortableTextBlock): string {
    return renderPortableTextSpans(block);
  }
}
