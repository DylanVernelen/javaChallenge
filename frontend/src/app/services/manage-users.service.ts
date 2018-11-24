import { Injectable } from '@angular/core';
import { User} from '../interfaces/user';
import {EMPTY, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, share, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  curentUser: User;
  token: string;

  constructor(private http: HttpClient) {
  }

  getUsers() {
    this.getToken();
    return this.http.get<Array<User>>('https://nodejs.tomvdr.com/node/api/user/all?token=' + this.token, {responseType: 'json'});
}

  // CRUD operaties
  createUser(user: User) {
    this.getToken();
    return this.http.put('https://nodejs.tomvdr.com/node/api/user/create?token=' + this.token, user, {responseType: 'json'});
  }

  updateUser(user: User) {
    this.getToken();
    return this.http.patch('https://nodejs.tomvdr.com/node/api/user/update?token=' + this.token, user, {responseType: 'json'});
  }

  deleteUser(id: string) {
    return this.http.delete('https://nodejs.tomvdr.com/node/api/user/delete/' + id + '?token=' + this.token, {responseType: 'json'});
  }

  getToken(){
    const user_str = localStorage.getItem("currentUser");
    if (user_str !== null) {
      this.curentUser= JSON.parse(user_str);
      this.token = this.curentUser.token;
    } else {
      this.token="";
    }
  }

}
