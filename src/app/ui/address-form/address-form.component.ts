import { Component, input, OnDestroy, OnInit, output, signal, Signal, effect } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog }  from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CityModel, CountryModel } from '../../models';
import { map, Observable, of, Subscription, switchMap, tap } from 'rxjs';
import { CitiesService } from '../../services/cities.service';
import { StreetDialogComponent } from '../street-dialog/street-dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule,
    ReactiveFormsModule, StreetDialogComponent],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent implements OnInit, OnDestroy {
  public form = input.required<FormGroup>();
  public index = input.required<number>();
  public countries = input.required<CountryModel[]>();
  public canRemove = input(false);

  public remove = output<void>();

  public cities: Signal<CityModel[]> = signal([]);
  public selectedCity: CityModel = new CityModel();
  public openModal = false;

  private countryControl: FormControl = new FormControl();
  private countryChangeSubscription = Subscription.EMPTY;
  private dialogSubscription = Subscription.EMPTY;

  constructor(private dialog: MatDialog, private citiesService: CitiesService) {
    effect(() => {
      const countries = this.countries();
      if (isNaN(this.countryControl.value?.id || NaN) && !!countries.length) this.countryControl.setValue(countries[0]);
      if (countries.length) {
        this.form().get('city')?.enable();
      } else {
        this.form().get('city')?.disable()
      }
    }, { allowSignalWrites: true });
  }

  public ngOnInit(): void {
    this.initCountry();
    this.initCities();
  }

  public ngOnDestroy(): void {
    this.countryChangeSubscription.unsubscribe();
    this.dialogSubscription.unsubscribe();
  }

  public initCountry(): void {
    const countryControl = this.form().get('country');
    if (!countryControl) throw new Error('Invalid initialized address form');
    this.countryControl = countryControl as FormControl;
  }

  public initCities(): void {
    this.cities = this.citiesService.getCities(this.countryControl.value?.id);
    this.countryChangeSubscription = this.countryControl.valueChanges
      .pipe(
        switchMap(({ id }) => this.citiesService.updateCitiesForCountry(id).pipe(map(() => id))),
        tap(id => this.cities = this.citiesService.getCities(id))
      ).subscribe();
  }

  public onAddCity(): void {
    this.dialogSubscription = this.dialog.open(StreetDialogComponent, {
      data: { countryName: this.form().value.country.name }
    }).afterClosed()
      .pipe(
        switchMap((cityName: string | undefined) => {
          if (cityName) return this.saveCity(cityName);
          return of([]);
        })
      ).subscribe();
  }

  public removeAddress(): void {
    this.remove.emit();
  }

  private saveCity(cityName: string): Observable<CityModel[]> {
    const countryId = this.form().value.country.id;
    const city = new CityModel()
    city.countryId = countryId;
    city.name = cityName
    return this.citiesService.createCity(city);
  }

}
