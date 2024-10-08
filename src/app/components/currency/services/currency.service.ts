import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ConverionPayload } from '../models/ParamsModel';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  getCurrency(): Observable<any> {
    return this.http.get<any>(`currency/currencies`)
  }
  
  getConversions(): Observable<any> {
    return this.http.get<any>(`currency/conversions`)
  }
  getLatestRates(base_currency?:string, currencies?:string): Observable<any> {
    return this.http.get<any>(`currency/latest${ (base_currency) ? '/'+base_currency : ''}${(currencies) ? '/'+currencies : ''}`)
  }

  insertConversions(payload:ConverionPayload): Observable<any> {
    return this.http.post<any>(`currency/insertconversion`, payload);
  }
}
