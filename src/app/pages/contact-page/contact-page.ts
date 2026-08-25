import { Component } from '@angular/core';

const ENGAGEMENT_TYPES = ['Consulting', 'R&D', 'Product Development', 'Training'];

@Component({
  selector: 'app-page-contact',
  standalone: false,
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.scss',
})
export class ContactPage {
  engagementTypes = ENGAGEMENT_TYPES;
  selectedEngagement: string | null = null;
  submitted = false;

  selectEngagement(type: string): void {
    this.selectedEngagement = this.selectedEngagement === type ? null : type;
  }

  onSubmit(): void {
    // Prototype only — no backend wired up yet. See CLAUDE plan: out of scope for Phase 1.
    this.submitted = true;
  }
}
