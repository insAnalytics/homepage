import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { CaseStudy } from '../../data/models';

const PAGE_SIZE = 9; // 3x3 grid per page

@Component({
  selector: 'app-page-case-studies',
  standalone: false,
  templateUrl: './case-studies.html',
  styleUrl: './case-studies.scss',
})
export class CaseStudies implements OnInit {
  cases: CaseStudy[] = [];
  activeIndustry: string | null = null;
  activeTechnology: string | null = null;
  currentPage = 1;

  constructor(private content: ContentService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // This app is zoneless — Angular has no way to know `cases` changed after
    // an async HTTP response unless we explicitly tell it via detectChanges().
    this.content.getCaseStudies().subscribe((cases) => {
      this.cases = cases;
      this.cdr.detectChanges();
    });
  }

  get industries(): string[] {
    return [...new Set(this.cases.flatMap((c) => c.industries))].sort((a, b) => a.localeCompare(b));
  }

  get technologies(): string[] {
    return [...new Set(this.cases.flatMap((c) => c.technologies))].sort((a, b) => a.localeCompare(b));
  }

  // Single-select per axis, AND'd together — up to 4 states: none, industry
  // only, technology only, or both.
  get filteredCases(): CaseStudy[] {
    return this.cases.filter(
      (c) =>
        (!this.activeIndustry || c.industries.includes(this.activeIndustry)) &&
        (!this.activeTechnology || c.technologies.includes(this.activeTechnology))
    );
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredCases.length / PAGE_SIZE));
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get pagedCases(): CaseStudy[] {
    const start = (this.currentPage - 1) * PAGE_SIZE;
    return this.filteredCases.slice(start, start + PAGE_SIZE);
  }

  setIndustry(industry: string): void {
    this.activeIndustry = this.activeIndustry === industry ? null : industry;
    this.currentPage = 1;
  }

  setTechnology(technology: string): void {
    this.activeTechnology = this.activeTechnology === technology ? null : technology;
    this.currentPage = 1;
  }

  clearFilters(): void {
    this.activeIndustry = null;
    this.activeTechnology = null;
    this.currentPage = 1;
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
