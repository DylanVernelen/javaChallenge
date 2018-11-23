import { Component, OnInit } from '@angular/core';
import { ManageUsersService} from '../services/manage-users.service';
import { User} from '../interfaces/user';
import set = Reflect.set;

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  userList: User[];
  succesMessage: string;
  errorMessage: string;

  constructor(private manageUsersService: ManageUsersService) { }

  ngOnInit() {
    this.getUsers();
  }

  addUser(userEmail: string, userLevel: string, pointCoint: number) {
    if (!pointCoint) {
      pointCoint = 0;
    }
    this.getUsers();
    let exists = false;
    for (const user of this.userList) {
      if (user.email.toLowerCase() == userEmail.toLowerCase()) {
        exists = true;
      }
    }
    if (!exists) {
      if (userEmail.trim() != '' && userLevel.trim() != '') {
        const newUser = { _id: '', email: userEmail.trim(), password: userEmail.trim() + '2018', userLevel: userLevel, pointCount: pointCoint, token: ''};
        this.manageUsersService.createUser(newUser)
          .subscribe(
            (result: User) => {
              console.log('success', result);
              this.getUsers();
              this.setSuccesMessage("Succes! User <b>" + userEmail + "</b> added!");
            },
            (error: any) => {
              console.log('error', error);
              this.setErrorMessage("Failed to add the user. Try again later.");
            }
          );
      } else {
        this.setErrorMessage("Failed to add the user. Make sure email and user level are filled in.");
      }
    } else {
      this.setErrorMessage("Failed to add the user. There's already an user with the same email adress.");
    }
  }

  getUsers() {
    this.manageUsersService.getUsers()
      .subscribe(
        (result: Array<User>) => {
          console.log('success', result);
          this.userList = result;
          this.userList.sort((obj1, obj2) => {
            if (obj1.email.toLowerCase() > obj2.email.toLowerCase()) {
              return 1;
            }
            if (obj1.email.toLowerCase() < obj2.email.toLowerCase()) {
              return -1;
            }
            return 0;
          });
        },
        (error: any) => {
          console.log('error', error);
          this.setErrorMessage("Couldn't load the Users. Please try again later.");
        }
      );
  }



  setSuccesMessage(text: string){
    let that = this;
    this.succesMessage = text;
    this.errorMessage = "";
    setTimeout(function(){
      that.succesMessage = "";
    }, 3000);
  }

  setErrorMessage(text: string){
    let that = this;
    this.errorMessage = text;
    this.succesMessage = "";
    setTimeout(function(){
      that.errorMessage = "";
    }, 3000);
  }

}
