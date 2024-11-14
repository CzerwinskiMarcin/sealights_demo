import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CountryModel } from '../../models';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.scss'
})
export class AddressFormComponent {
  public form = input.required<FormGroup<{}>>();
  public index = input.required<number>();
  public countries = input.required<CountryModel[]>();
  public canRemove = input(false);

  public remove = output<void>();
  public addCity = output<string>();

  public openModal = false;

  public onAddCity(): void {
    this.openModal = true;
  }

  public saveCity(cityName: string): void {
    this.addCity.emit(cityName);
    this.openModal = false;
  }

  public removeAddress(): void {
    this.remove.emit();
  }
}
