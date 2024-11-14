import { Injectable } from '@angular/core';
import { City, CityModel } from '../models';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService extends BaseService<City, CityModel> {
  constructor(http: HttpClient) { super(http); }
  
  getCities(countryId: string): Observable<CityModel[]> {
    return this.http.get<CityModel[]>(`${this.ENDPOINT}/cities/${countryId}`)
      .pipe(
        map(res => res.map(city => new CityModel().fromResponse(city)))
      );
  }
}
