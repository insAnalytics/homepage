import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-expertise',
  standalone: false,
  templateUrl: './expertise.html',
  styleUrl: './expertise.scss',
})
export class Expertise implements OnInit {
  industries: string[] = [];
  businessFunctions: string[] = [];

  constructor(private content: ContentService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // This app is zoneless — Angular has no way to know these fields changed
    // after an async HTTP response unless we explicitly tell it via
    // detectChanges().
    this.content.getIndustries().subscribe((industries) => {
      this.industries = industries;
      this.cdr.detectChanges();
    });
    this.content.getBusinessFunctions().subscribe((businessFunctions) => {
      this.businessFunctions = businessFunctions;
      this.cdr.detectChanges();
    });
  }
}
