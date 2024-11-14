import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_PATHS } from '../../constants/routerPaths';
import { UsersService } from '../../services/users.service';
import { Observable, of } from 'rxjs';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [],
  providers: [UsersService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  public users$: Observable<{}> = of([]);
  public countries$: Observable<{}[]> = of([]);
  constructor(private router: Router, private usersService: UsersService, private countriesService: CountriesService) {}

  public ngOnInit(): void {
    this.users$ = this.usersService.getUsers();
    this.countries$ = this.countriesService.getCountries();
    this.countries$.subscribe();
  }

  onAddUserClick(): void {
    this.router.navigate([ROUTER_PATHS.ADD_USERS]);
  }
}
