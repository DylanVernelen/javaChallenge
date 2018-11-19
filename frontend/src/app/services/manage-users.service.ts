import { Injectable } from '@angular/core';
import { Users} from "../interfaces/users";

@Injectable({
  providedIn: 'root'
})
export class ManageUsersService {

  //userList voorlopig dummy items
  userList: Users[] = [
    {email: "test@gmail.com"},
    {email: "voorbeeld2@hotmail.com"}
  ];

  constructor() {
  }

  //CRUD operaties
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