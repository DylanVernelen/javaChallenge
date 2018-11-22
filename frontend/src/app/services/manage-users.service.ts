import { Injectable } from '@angular/core';
import { User} from '../interfaces/user';
import {EMPTY, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, share, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  // userList voorlopig dummy items
  userList: User[] = [
    {_id: "1", email: "test@gmail.com", userLevel: "admin", password: "", pointCount: 1, token: ""},
    {_id: "2", email: "voorbeeld2@hotmail.com",  userLevel: "gebruiker", password: "", pointCount: 2, token: ""}
  ];

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<Array<User>>('https://nodejs.tomvdr.com/node/api/user/all?token=ABCDEF', {responseType: 'json'});
}

  // CRUD operaties
  createUser(user: User) {

    // this.userList.unshift(user);
    return this.http.post('https://nodejs.tomvdr.com/node/api/user/create?token=ABCDEF', user, {responseType: 'json'});
  }

  updateUser(user: User) {
    // this.userList[i] = user;
    return this.http.put('https://nodejs.tomvdr.com/node/api/user/update?token=ABCDEF', user, {responseType: 'json'});
  }

  deleteUser(id: string) {
    return this.http.delete('https://nodejs.tomvdr.com/node/api/user/delete/' + id + '?token=ABCDEF', {responseType: 'json'});
  }

  // LocalStorage operaties
  writeLocalStorage() {
    // code volgt later
  }

  readLocaleStorage() {
    // code volgt later
  }
}
