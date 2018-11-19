import { Component, OnInit } from '@angular/core';
import { ManageUsersService} from "../services/manage-users.service";
import { Users} from "../interfaces/users";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  userList: Users[];

  constructor(private manageUsersService: ManageUsersService) { }

  ngOnInit() {
    this.userList = this.manageUsersService.userList;
  }

  addUser(user: string){
    if(user.trim() != ""){
      const newUser = { email: user.trim(), password: "", userLevel: "gebruiker"}
      this.manageUsersService.createUser(newUser);
    }
  }

}
