import { Component, OnInit, Signal, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { ROUTER_PATHS } from '../../constants/routerPaths';
import { UsersService } from '../../services/users.service';
import { CountriesService } from '../../services/countries.service';
import { CountryModel, UserModel } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatTableModule],
  providers: [UsersService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  public users: Signal<UserModel[]> = signal([]);
  public countries: Signal<CountryModel[]> = signal([]);
  public displayedColumns = ['id', 'name', 'birthdate', 'addressesCount'];
  constructor(private router: Router, private usersService: UsersService, private countriesService: CountriesService) {}


  public ngOnInit(): void {
    this.countries = this.countriesService.countries;
    this.users = this.usersService.users;
    this.usersService.getUsers().subscribe();
  }

  onAddUserClick(): void {
    this.router.navigate([ROUTER_PATHS.ADD_USERS]);
  }
}
