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
                this.setManageSuccesMessage("Succes! User <b>" + this.item.email + "</b> is edited!");
                this.close();
              },
              (error: any) => {
                console.log('error', error);
                this.setThisErrorMessage("Failed to edit the user. Try again later.");
              }
            );
        } else {
          this.setThisErrorMessage("Failed to edit the user. Passwords aren't the same.");
        }
      } else {
        this.setThisErrorMessage("Failed to add the user. Make sure email and user level are filled in.");
      }
    } else {
      this.setThisErrorMessage("Failed to add the user. There's already an user with the same email adress.");
    }
  }


  deleteUser() {
    this.manageUsersService.deleteUser(this.item._id)
      .subscribe(
        (result) => {
          console.log('success', result);
          this.setManageSuccesMessage("Succes! User <b>" + this.item.email + "</b> is deleted.");
          this.manageUsersComponent.getUsers();
          this.close();
        },
        (error: any) => {
          console.log('error', error);
          this.setManageErrorMessage("Failed to delete the user. Please try again later.");
          this.close();
        }
      );
  }

  setThisErrorMessage(text: string){
    let that = this;
    this.errorMessage = text;
    /*setTimeout(function(){
      that.errorMessage = "";
      }, 3000);*/
  }

  setManageSuccesMessage(text: string){
    let that = this;
    this.manageUsersComponent.succesMessage = text;
    this.manageUsersComponent.errorMessage = "";
    setTimeout(function(){
       that.manageUsersComponent.succesMessage = "";
    }, 3000);
  }

  setManageErrorMessage(text: string){
    let that = this;
    this.manageUsersComponent.errorMessage = text;
    this.manageUsersComponent.succesMessage = "";
    setTimeout(function(){
      that.manageUsersComponent.errorMessage = "";
    }, 3000);
  }

  open(content) {
    this.activeModal = this.modal.open(content);
  }

  close() {
    this.activeModal.close();
  }

}
