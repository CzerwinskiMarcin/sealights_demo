import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CountryData, CountryModel } from '../models';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService extends BaseService<CountryData, CountryModel> {

  constructor(http: HttpClient) { super(http); }

  getCountries(): Observable<CountryModel[]> {
    return this.http.get<CountryData[]>(`${this.ENDPOINT}/countries`).pipe(
      map(res => res.map(res => new CountryModel().fromResponse(res)))
    );
  }
}
