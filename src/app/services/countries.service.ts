import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

import { BaseService } from './base.service';
import { CountryData, CountryModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CountriesService extends BaseService<CountryData, CountryModel> {
  private countriesSignal: WritableSignal<CountryModel[]> = signal([]);

  constructor(http: HttpClient) { super(http); }

  get countries(): Signal<CountryModel[]> {
    return computed(() => this.countriesSignal());
  }

  public updateCountries(): Observable<CountryModel[]> {
    return this.get(`${this.ENDPOINT}/countries`).pipe(
      map(res => res.map(res => new CountryModel().fromResponse(res))),
      tap(countries => this.countriesSignal.set(countries))
    );
  }
}
