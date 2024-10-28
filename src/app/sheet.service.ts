import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { interval, map, Observable, switchMap, timer } from 'rxjs';
import { environment } from './environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  private sheetUrl = environment.SheetId;
  http=inject(HttpClient);
  getSheetData(): Observable<any> {
    return this.http.get(this.sheetUrl);
  }
  getDataWithPolling(): Observable<Event[]> {
    return timer(0, 5000).pipe(
      switchMap(() => this.getSheetData()),
    );
  }

}
