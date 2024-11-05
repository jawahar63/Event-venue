import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { interval, map, Observable, switchMap, timer } from 'rxjs';
import { environment } from './environments/environment.development';
import { Event } from './pages/table/table.component';

@Injectable({
  providedIn: 'root'
})
export class SheetService {
  private sheetUrl = environment.SheetId;
  http = inject(HttpClient);


  

  getRealTimeSheetData(): Observable<any[]> {
    return timer(0, 5000)
      .pipe(
        switchMap(() => this.http.get<any[]>(this.sheetUrl))
      );
  }
}
