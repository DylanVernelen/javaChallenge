import { Component, OnInit } from '@angular/core';
import { ManageUsersService} from '../services/manage-users.service';
import { Users} from '../interfaces/users';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  userList: Users[];

  constructor(private manageUsersService: ManageUsersService) { }

  ngOnInit() {
    this.manageUsersService.getUsers()
      .subscribe(
        (result: Array<Users>) => {
          console.log('success', result);
          this.userList = result;
        },
        (error: any) => {
          console.log('error', error);
        }
      );
    // this.userList = this.manageUsersService.userList;
  }


  addUser(user: string){
    if(user.trim() != ""){
      const newUser = { email: user.trim(), password: "", userLevel: "gebruiker", pointCount: 0}
      //this.manageUsersService.createUser(newUser);
    }
  }

}
