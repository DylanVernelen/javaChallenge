import { Component, OnInit } from '@angular/core';
import {User} from "../interfaces/user";
import {ManageUsersService} from "../services/manage-users.service";
import {forEach} from "@angular/router/src/utils/collection";
import {Challenge} from "../interfaces/challenge";
import {ManageChallengesService} from "../services/manage-challenges.service";

@Component({
  selector: 'app-accept-challenges',
  templateUrl: './accept-challenges.component.html',
  styleUrls: ['./accept-challenges.component.scss']
})
export class AcceptChallengesComponent implements OnInit {

  constructor(private manageUsersService: ManageUsersService, private  challengeService: ManageChallengesService) { }
  userList: any[];
  number = 0;
  challenge: any;
  completedchallenge: any;
  challengeUserList= [];
    succesMessage: string;
    errorMessage: string;
  challenges = [];
  challengesViewlist = [];
  ngOnInit() {
this.getUsers();

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
            if (user.challenges != null){
                for (let challenge of user.challenges) {
                    this.challenge = this.challengeService.getChallenge(challenge.challengeid.toString());
                    const newChallenge = { userid: user._id, user: user.email, challenge:this.challenge.challengeName, challengeid: challenge.challengeid , uniqueid: challenge.uniqueid, description: challenge.description, status: challenge.challengeStatus  };
                    this.challenges.push(newChallenge);
                }
            }
        }
        this.orderByStatus();
    }
    orderByStatus( ){
        this.challenges.sort((a, b): number => {
            if (a.status < b.status) { return 1; }
            if (a.status > b.status) { return -1; }
            return 0;
    });
    }
    orderByUser( ){
        this.challenges.sort((a, b): number => {
            if (a.user < b.user) { return 1; }
            if (a.user > b.user) { return -1; }
            return 0;
        });
    }
    acceptChallenge(userid, challengeid,uniqueid) {
        const completedChallenge = { userid: userid,
            challengeid :  challengeid , uniqueid:uniqueid };
        this.challengeService.acceptChallenge(completedChallenge) .subscribe(
            (result: Challenge) => {
                this.challenges.length=0;
                this.getUsers();
                console.log('success', result);


            },
            (error: any) => {
                console.log('error', error);
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
