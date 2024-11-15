import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountriesService } from './services/countries.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private countriesService: CountriesService) { }

  async ngOnInit(): Promise<void> {
    await this.countriesService.updateCountries().subscribe();
  }
}
