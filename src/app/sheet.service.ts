import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SheetService {

  // private sheetUrl =`https://docs.google.com/spreadsheets/d/e/2PACX-1vT7JM0IelEOvjFYbqBINI3mKdO2o0_bO10rddCOCjY0QkviTn-d5V221xRxxf4VRiBZQWUcBpyCOvnH/pubhtml?gid=0&single=true`
  // http=inject(HttpClient);
  // getSheetData(): Observable<any> {
  //   return this.http.get(this.sheetUrl);
  // }

}
