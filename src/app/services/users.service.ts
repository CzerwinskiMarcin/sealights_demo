import { HttpClient } from '@angular/common/http';
import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { BaseService } from './base.service';
import { UserData, UserModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<UserData, UserModel> {
  usersSignal: WritableSignal<UserModel[]> = signal([]);

  get users(): Signal<UserModel[]> {
    return computed(() => this.usersSignal());
  }

  constructor(http: HttpClient) { super(http); }

  public getUsers(): Observable<UserModel[]> {
    return this.get(`${this.ENDPOINT}/persons`)
      .pipe(
        map((userData: UserData[]) => userData.map(data => new UserModel().fromResponse(data))),
        tap(users => this.usersSignal.set(users))
      );
  }

  public createUser(user: UserModel): Observable<void> {
    return this.post(`${this.ENDPOINT}/person`, user.toResponse());
  }
}
