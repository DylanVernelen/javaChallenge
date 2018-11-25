import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../interfaces/user';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {

  curentUser;
  token: string;

  constructor(private http: HttpClient) {
    this.getToken();
  }

  getAll() {
    this.getToken();
      return this.http.get<User[]>(environment.apiPath + '/user/all?token=' + this.token);
  }

  getUser() {
    this.getToken();
    return this.http.get('https://nodejs.tomvdr.com/node/api/user/get/' + this.curentUser.id + '?token=' + this.token, {responseType: 'json'});
  }
  getToken() {
    const user_str = localStorage.getItem('currentUser');
    if (user_str !== null) {
      this.curentUser = JSON.parse(user_str);
      this.token = this.curentUser.token;
    } else {
      this.token = '';
    }
  }
}
