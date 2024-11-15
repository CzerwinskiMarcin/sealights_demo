import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { CityData, CityModel } from '../models';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CitiesService extends BaseService<CityData, CityModel> {
  private citiesSignal: WritableSignal<{[countryId: number]: CityModel[]}> = signal({});

  constructor(http: HttpClient) { super(http); }

  public updateCitiesForCountry(countryId: number): Observable<CityModel[]> {
    return this.get(`${this.ENDPOINT}/cities/${countryId}`)
      .pipe(
        map(res => res.map(city => {
          const model = new CityModel().fromResponse(city);
          model.countryId = countryId;
          return model;
        })),
        tap(cities => this.citiesSignal.set({ ...this.citiesSignal(), [countryId]: cities }))
      );
  }

  public getCities(countryId: number): Signal<CityModel[]> {
    return computed(() => {
      const map = this.citiesSignal();
      if (countryId in map) return map[countryId]
      return []
    });
  }

  public createCity(city: CityModel): Observable<CityModel[]> {
    return this.post(`${this.ENDPOINT}/city`, {name: city.toResponse().name, countryId: city.countryId})
      .pipe(switchMap(() => this.updateCitiesForCountry(city.countryId)))
    ;
  }
}
