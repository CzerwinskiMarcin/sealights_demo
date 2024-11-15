import { Component, OnInit, signal, Signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';

import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryModel, UserModel } from '../../models';
import { Router } from '@angular/router';
import { ROUTER_PATHS } from '../../constants/routerPaths';
import { CountriesService } from '../../services/countries.service';
import { AddressFormComponent } from '../../ui/address-form/address-form.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-add',
  standalone: true,
  imports: [
    AddressFormComponent, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatIconModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [
    provideNativeDateAdapter({
      parse: {
        dateInput: 'LL',
      },
      display: {
        dateInput: 'YYYY/DD/MM/YYYY',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY',
      },
    })
  ],
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.scss'
})
export class UserAddComponent implements OnInit {
  public countries: Signal<CountryModel[]> = signal([]);

  public userForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    birthdate: new FormControl(null),
    addresses: new FormArray([this.createAddressForm()])
  });

  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  constructor(private router: Router, private usersServices: UsersService, private countriesService: CountriesService) {}

  public ngOnInit(): void {
    this.countries = this.countriesService.countries;
  }

  public addAddress(): void {
    this.addresses.push(this.createAddressForm());
  }

  public onRemove(addressIndex: number): void {
    (this.userForm.get('addresses') as FormArray).removeAt(addressIndex)
  }
  
  public getAddressId(address: FormGroup): number {
    return address.get('id')?.value || Math.floor(Math.random() * 1_000_000);
  }

  public async onSubmit(): Promise<void> {
    let {name, birthdate = undefined, addresses = [] } = this.userForm.value;
    if (birthdate === null) birthdate = undefined;
    if (!name) name = '';
    const user = new UserModel().fillFromFormData({ name, birthdate, addresses});
    try {
      await this.usersServices.createUser(user).subscribe();
      console.log(this.userForm.value);
      // this.router.navigate([ROUTER_PATHS.USERS_LIST]);
    } catch (err) {
      console.log('Error', err);
    }
  }

  public onCancelClick(): void {
    this.router.navigate([ROUTER_PATHS.USERS_LIST]);
  }

  private createAddressForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(Math.floor(Math.random() * 10_000_000)),
      name: new FormControl('', [Validators.required]),
      country: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      street: new FormControl('', [Validators.required])
    });
  }
}
