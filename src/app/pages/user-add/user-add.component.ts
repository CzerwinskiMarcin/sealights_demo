import { Component, OnInit } from '@angular/core';

import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryModel } from '../../models';
import { Router } from '@angular/router';
import { ROUTER_PATHS } from '../../constants/routerPaths';
import { CountriesService } from '../../services/countries.service';
import { map, Observable, tap } from 'rxjs';
import { AddressFormComponent } from '../../ui/address-form/address-form.component';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [ReactiveFormsModule, AddressFormComponent],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss'
})
export class UserAddComponent implements OnInit {
  public countries: CountryModel[] = [];

  constructor(private router: Router, private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.updateCountries().subscribe();
  }

  public userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    birthdate: new FormControl(new Date()),
    addresses: new FormArray([this.createAddressForm()])
  });

  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  public getAvailableCities(index: number): string[] {
    const values = this.addresses.controls[index].get('country')
    return [];
  }

  public addAddress(): void {
    this.addresses.push(this.createAddressForm());
  }

  public addCity(cityName: any): void {
    console.log(cityName)
    console.log('Add addCity', cityName);
  }

  public getCities(countryId: number): string[] {
    if (countryId === undefined) return [];
    return [];
  }

  public onSubmit(): void {
    console.log(this.userForm.status);
    console.log(this.userForm.value);
    console.log('On submit');
    // TODO: Save it on backend
    this.router.navigate([ROUTER_PATHS.USERS_LIST]);
  }

  private createAddressForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      country: new FormControl(this.countries[0]),
      city: new FormControl(''),
      street: new FormControl('', [Validators.required])
    });
  }

  private updateCountries(): Observable<CountryModel[]> {
    return this.countriesService.getCountries().pipe(
      tap(countries => this.countries = countries)
    );
  }
}
