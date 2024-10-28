import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SheetService } from '../../sheet.service';
import { HttpClient } from '@angular/common/http';

interface Status {
  status: 'Open' | 'Closed';
  time?: string; 
}

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
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit{


  sanitizer=inject(DomSanitizer)
  sheetService=inject(SheetService)
  filter = '';
  
  datas: Event[] = [
    // {
    //   eventName: 'SlideScape (Paper)',
    //   Status: {
    //     status: 'Open',
    //     time: '10:30'
    //   },
    //   venue: 'WW200',
    //   Map: `https://maps.app.goo.gl/hipAN7UbRrYjgXuk6`
    // },
    // {
    //   eventName: 'Code Matrix',
    //   Status: {
    //     status: 'Closed'
    //   },
    //   venue: 'ME201',
    //   Map: `https://maps.app.goo.gl/CZTeCngaYJC6Tk5c9`
    // },
    // {
    //   eventName: 'TechHorizon',
    //   Status: {
    //     status: 'Closed'
    //   },
    //   venue: 'EW102',
    //   Map: `https://maps.app.goo.gl/i8MM3WBNoB9TQb89A`
    // }
  ];

  currentPage = 1;
  itemsPerPage = 5;
  totalItems: number = this.datas.length;


  ngOnInit(): void {
    this.fetchSheetData();
  }
  fetchSheetData() {
    console.log(1);
    this.sheetService.getDataWithPolling().subscribe((response: any) => {
      this.datas = response
    });
  }
    get sanitizedMaps() {
      return this.datas.map(data => ({
          ...data,
          safeMap: this.sanitizer.bypassSecurityTrustHtml(data.Map)
      }));
  }

  get paginatedData() {
      // Ensure filter is defined and use an empty string if it's undefined
      const searchTerm = this.filter?.toLowerCase() || '';

      const filteredData = this.datas.filter(data => {
          const eventName = data.eventName?.toLowerCase() || ''; // Safe access to eventName
          const venue = data.venue?.toLowerCase() || ''; // Safe access to venue
          return eventName.includes(searchTerm) || venue.includes(searchTerm);
      });

      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      return filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
      const searchTerm = this.filter?.toLowerCase() || '';

      const filteredData = this.datas.filter(data => {
          const eventName = data.eventName?.toLowerCase() || ''; 
          const venue = data.venue?.toLowerCase() || ''; 
          return eventName.includes(searchTerm) || venue.includes(searchTerm);
      });

      return Math.ceil(filteredData.length / this.itemsPerPage);
  }


  get pageNumbers() {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  changePage(page: number) {
    this.currentPage = page;
  }
  showMap(map: string) {
    window.open(map);
  }
}
