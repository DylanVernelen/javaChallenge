import { Component, OnInit } from '@angular/core';
import { ManageUsersService} from '../services/manage-users.service';
import {User} from '../interfaces/user';

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
    if (user.trim() !== '') {
      const newUser = { id: '2', email: user.trim(), password: user.trim() + '2018', userLevel: 'gebruiker', pointCount: 0, token: ''};
      this.manageUsersService.createUser(newUser)
        .catch(function (error) {
          console.log(error);
      });
    }
  }

}
