import { Injectable } from '@angular/core';
import { Users} from '../interfaces/users';
import {EMPTY, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, share, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  // userList voorlopig dummy items
  userList: Users[] = [
    {email: 'test@gmail.com', userLevel: 'admin', password: ''},
    {email: 'voorbeeld2@hotmail.com',  userLevel: 'gebruiker', password: ''}
  ];

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<Array<Users>>('https://nodejs.tomvdr.com/node/api/user/all?token=ABCDEF', {responseType: 'json'});
}

  // CRUD operaties
  createUser(user: Users) {
    this.userList.unshift(user);
  }

  updateUser(user: Users, i: number) {
    this.userList[i] = user;
  }

  deleteUser(i: number) {
    this.userList.splice(i, 1);
  }

  // LocalStorage operaties
  writeLocalStorage() {
    // code volgt later
  }

  readLocaleStorage() {
    // code volgt later
  }
}
