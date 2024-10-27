import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { SheetService } from '../../sheet.service';

interface Status {
  status: 'Open' | 'Closed';
  time?: string; 
}

export interface Event {
  eventName: string;
  Status: Status;
  venue: string;
  Map: string;  
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
    {
      eventName: 'SlideScape (Paper)',
      Status: {
        status: 'Open',
        time: '10:30'
      },
      venue: 'WW200',
      Map: `https://maps.app.goo.gl/hipAN7UbRrYjgXuk6`
    },
    {
      eventName: 'Code Matrix',
      Status: {
        status: 'Closed'
      },
      venue: 'ME201',
      Map: `https://maps.app.goo.gl/CZTeCngaYJC6Tk5c9`
    },
    {
      eventName: 'TechHorizon',
      Status: {
        status: 'Closed'
      },
      venue: 'EW102',
      Map: `https://maps.app.goo.gl/i8MM3WBNoB9TQb89A`
    }
  ];

  currentPage = 1;
  itemsPerPage = 5;
  totalItems: number = this.datas.length;


  ngOnInit(): void {
    // this.fetchDataFromSheet();
  }
  // fetchDataFromSheet() {
  //   this.sheetService.getSheetData().subscribe((response: any) => {
  //     console.log(response)
  //   });
  // }
  get sanitizedMaps() {
    return this.datas.map(data => ({
      ...data,
      safeMap: this.sanitizer.bypassSecurityTrustHtml(data.Map)
    }));
  }

  get paginatedData() {
    const filteredData = this.datas.filter(data =>
      data.eventName.toLowerCase().includes(this.filter.toLowerCase()) ||
      data.venue.toLowerCase().includes(this.filter.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filteredData.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    const filteredData = this.datas.filter(data =>
      data.eventName.toLowerCase().includes(this.filter.toLowerCase()) ||
      data.venue.toLowerCase().includes(this.filter.toLowerCase())
    );
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
