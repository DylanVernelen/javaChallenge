import { Injectable } from '@angular/core';
import {Oid, User} from '../interfaces/user';
import {EMPTY, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError, share, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  // userList voorlopig dummy items
  userList: User[] = [
    {id: new Oid(0), email: "test@gmail.com", userLevel: "admin", password: "", pointCount: 1, token: ""},
    {id: new Oid(0), email: "voorbeeld2@hotmail.com",  userLevel: "gebruiker", password: "", pointCount: 2, token: ""}
  ];

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get<Array<User>>('https://nodejs.tomvdr.com/node/api/user/all?token=ABCDEF', {responseType: 'json'});
}

  // CRUD operaties
  createUser(user: User) {
    //this.userList.unshift(user);
    return this.http.post('https://nodejs.tomvdr.com/node/api/user/create?token=ABCDEF', user)
      .toPromise();
  }

  updateUser(user: User, i: number) {
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
