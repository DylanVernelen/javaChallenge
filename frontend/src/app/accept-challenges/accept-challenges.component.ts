import { Component, OnInit } from '@angular/core';
import {User} from "../interfaces/user";
import {ManageUsersService} from "../services/manage-users.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-accept-challenges',
  templateUrl: './accept-challenges.component.html',
  styleUrls: ['./accept-challenges.component.scss']
})
export class AcceptChallengesComponent implements OnInit {

  constructor(private manageUsersService: ManageUsersService) { }
  userList: any[];
    succesMessage: string;
    errorMessage: string;
  challenges = [];
  challengesViewlist:any[];
  ngOnInit() {
this.getUsers();
console.log(this.userList);

  }
  getUsers() {
      this.manageUsersService.getUsers()
          .subscribe(
              (result: Array<User>) => {
                  console.log('success', result);
                  this.userList = result;
                  this.getChallengesList();
              },
              (error: any) => {
                  console.log('error', error);
                  this.setErrorMessage("Couldn't load the Users. Please try again later.");
              }
          );
  }
  getChallengesList() {
        for (let user of this.userList) {
            console.log(user);
            if (user.challenges != null){
                  this.challenges.push(user.challenges);
            }

        }

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
