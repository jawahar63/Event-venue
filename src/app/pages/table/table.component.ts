import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SheetService } from '../../sheet.service';

export interface Event {
  Map: string;
  Status: 'Open' | 'Closed';
  eventName: string;
  time: string;
  venue: string;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'] // corrected styleUrl to styleUrls
})
export class TableComponent implements OnInit {
  sanitizer = inject(DomSanitizer);
  sheetService = inject(SheetService);
  filter = '';
  
  datas: Event[] = [];

  ngOnInit(): void {
    this.fetchSheetData();
  }

  fetchSheetData() {
    this.sheetService.getRealTimeSheetData().subscribe((response: Event[]) => {
      this.datas = response.sort((a, b) => {
        // Move closed events to the end
        if (a.Status === 'Closed' && b.Status === 'Open') return 1;
        if (a.Status === 'Open' && b.Status === 'Closed') return -1;
        return 0; // Keep the order if both are the same
      });
    });
  }

  get sanitizedMaps() {
    return this.datas.map(data => ({
      ...data,
      safeMap: this.sanitizer.bypassSecurityTrustHtml(data.Map)
    }));
  }

  get filteredData() {
    const searchTerm = this.filter?.toLowerCase() || '';
    return this.datas.filter(data => {
      const eventName = data.eventName?.toLowerCase() || '';
      const venue = data.venue?.toLowerCase() || '';
      return eventName.includes(searchTerm) || venue.includes(searchTerm);
    });
  }

  showMap(map: string) {
    window.open(map);
  }
}
