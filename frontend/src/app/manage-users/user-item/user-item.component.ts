import {Component, Input, OnInit} from '@angular/core';
import {Users} from "../../interfaces/users";
import {ManageUsersService} from "../../services/manage-users.service";

@Component({
  selector: '[app-user-item]',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input() item: Users;
  @Input() index: number;
  hideInputField = true;

  constructor(private manageUsersService: ManageUsersService) { }

  ngOnInit() {
  }

  updateUser() {
    this.manageUsersService.updateUser(this.item, this.index);
    this.hideInputField = true;
  }


  deleteUser() {
    this.manageUsersService.deleteUser(this.index);
  }

}
