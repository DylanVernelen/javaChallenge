import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {ManageUsersService} from '../../services/manage-users.service';
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ManageUsersComponent} from "../manage-users.component";

@Component({
  selector: '[app-user-item]',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {

  @Input() item: User;
  @Input() index: number;
  activeModal: NgbActiveModal;
  succesMessage: string;
  errorMessage: string;

  constructor(private manageUsersService: ManageUsersService, private modal: NgbModal, private manageUsersComponent: ManageUsersComponent) { }

  ngOnInit() {
  }

  updateUser(userEmail: string, userLevel: string, pointCoint: number, password1: string, password2: string) {
    if(!pointCoint){
      pointCoint = 0;
    }
    this.manageUsersComponent.getUsers();
    let exists: boolean = false;
    for(let user of this.manageUsersComponent.userList){
      if(user.email.toLowerCase() == userEmail.toLowerCase() && userEmail != this.item.email){
        exists = true;
      }
    }
    if(!exists){
      if(userEmail.trim() != "" && userLevel.trim() != ""){
        if(password1 == password2){
          const newUser = { _id: this.item._id, email: userEmail.trim(), password: password1, userLevel: userLevel, pointCount: pointCoint, token: ""};
          this.manageUsersService.updateUser(newUser)
            .subscribe(
              (result: User) => {
                console.log('success', result);
                this.manageUsersComponent.getUsers();
                this.manageUsersComponent.succesMessage = "Succes! User " + this.item.email + " is edited!";
                this.manageUsersComponent.errorMessage = "";
                this.close();
              },
              (error: any) => {
                console.log('error', error);
                this.errorMessage = "Failed to edit the user. Try again later.";
              }
            );
        } else {
          this.errorMessage = "Failed to edit the user. Passwords aren't the same.";
        }
      } else {
        this.errorMessage = "Failed to add the user. Make sure email and user level are filled in.";
      }
    } else {
      this.errorMessage = "Failed to add the user. There's already an user with the same email adress.";
    }
  }


  deleteUser() {
    this.manageUsersService.deleteUser(this.item._id)
      .subscribe(
        (result) => {
          console.log('success', result);
          this.manageUsersComponent.succesMessage = "Succes! User " + this.item.email + " is deleted.";
          this.manageUsersComponent.errorMessage = "";
          this.manageUsersComponent.getUsers();
          this.close();
        },
        (error: any) => {
          console.log('error', error);
          this.manageUsersComponent.errorMessage = "Failed to delete the user. Please try again later.";
          this.close();
        }
      );
  }

  open(content) {
    this.activeModal = this.modal.open(content);
  }

  close() {
    this.activeModal.close();
  }

}
