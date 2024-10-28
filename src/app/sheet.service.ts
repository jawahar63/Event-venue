import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { interval, map, Observable, switchMap } from 'rxjs';
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
    return interval(5000)
      .pipe(
        switchMap(() => this.getSheetData()),
      );
  }

}
