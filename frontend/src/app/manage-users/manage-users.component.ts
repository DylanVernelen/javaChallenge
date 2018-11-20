import { Component, OnInit } from '@angular/core';
import { ManageUsersService} from '../services/manage-users.service';
<<<<<<< HEAD
import {User} from '../interfaces/user';
=======
import { User} from '../interfaces/user';
>>>>>>> change users

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  userList: User[];

  constructor(private manageUsersService: ManageUsersService) { }

  ngOnInit() {
    this.manageUsersService.getUsers()
      .subscribe(
        (result: Array<User>) => {
          console.log('success', result);
          this.userList = result;
        },
        (error: any) => {
          console.log('error', error);
        }
      );
    // this.userList = this.manageUsersService.userList;
  }



  addUser(user: string) {
    if(user.trim() != ""){
      const newUser = { _id:"3", email: user.trim(), password: user.trim()+"2018", userLevel: "gebruiker", pointCount: 0, token: ""}
      this.manageUsersService.createUser(newUser)
        .subscribe(
          (result: User) => {
            console.log('success', result);
            this.userList.push(result);
          },
          (error: any) => {
            console.log('error', error);
          }
        );
    }
  }

}
