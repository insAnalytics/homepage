import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';
import { Office } from '../../data/models';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  offices: Office[] = [];

  constructor(private content: ContentService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // This app is zoneless — Angular has no way to know `offices` changed
    // after an async HTTP response unless we explicitly tell it via
    // detectChanges().
    this.content.getOffices().subscribe((offices) => {
      this.offices = offices;
      this.cdr.detectChanges();
    });
  }
}
