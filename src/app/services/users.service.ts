import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { User, UserModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<User, UserModel> {
  constructor(http: HttpClient) { super(http); }

  public getUsers(): Observable<{}> {
    return this.http.get(`${this.ENDPOINT}/persons`);
  }

  public createUser(user: UserModel): Observable<{}> {
    return this.http.post(`${this.ENDPOINT}/person`, user.toResponse());
  }
}
