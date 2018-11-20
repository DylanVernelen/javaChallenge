import { Component, OnInit } from '@angular/core';
import { ManageUsersService} from '../services/manage-users.service';
import { User} from '../interfaces/user';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  userList: User[];

  constructor(private manageUsersService: ManageUsersService) { }

      ngOnInit()
      {
          this.getUsers();
          // this.userList = this.manageUsersService.userList;
      }

      addUser(userEmail: string, userLevel: string) {
          console.log("Email: " + userEmail);
          console.log("Level: " + userLevel);
          if (userEmail.trim() != "" && userLevel.trim() != "") {
              const newUser = {
                  _id: "3",
                  email: userEmail.trim(),
                  password: userEmail.trim() + "2018",
                  userLevel: userLevel,
                  pointCount: 0,
                  token: ""
              }
              this.manageUsersService.createUser(newUser)
                  .subscribe(
                      (result: User) => {
                          console.log('success', result);
                          this.getUsers();
                      },
                      (error: any) => {
                          console.log('error', error);
                      }
                  );
          }
      }
      getUsers()
      {
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
      }


  }