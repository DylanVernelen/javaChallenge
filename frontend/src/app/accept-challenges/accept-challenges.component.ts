import { Component, OnInit } from '@angular/core';
import {User} from "../interfaces/user";
import {ManageUsersService} from "../services/manage-users.service";
import {forEach} from "@angular/router/src/utils/collection";
import {Challenge} from "../interfaces/challenge";
import {ManageChallengesService} from "../services/manage-challenges.service";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-accept-challenges',
  templateUrl: './accept-challenges.component.html',
  styleUrls: ['./accept-challenges.component.scss']
})
export class AcceptChallengesComponent implements OnInit {
    activeModal: NgbActiveModal;
  constructor(private manageUsersService: ManageUsersService, private  challengeService: ManageChallengesService,
              private modal: NgbModal) { }
  userList: any[];
  status: String;
  number = 0;
  challenge: any;
  challenges = [];
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
              }
          );
  }
  getChallengesList() {
        for (let user of this.userList) {
            if (user.challenges != null){
                for (let challenge of user.challenges) {
                   this.challengeService.getChallenge(challenge.challengeid.toString()).subscribe(
                        (result: Challenge) => {
                            this.challenge = result;
                            console.log(this.challenge);
                        },
                       (error: any) => {
                           console.log('error', error);
                       }
                    );
                    if (challenge.challengeStatus === 'rejected') {
                        challenge.challengeStatus = 'denied';
                    }
                    const newChallenge = { userid: user._id, user: user.email, challengeid: challenge.challengeid , uniqueid: challenge.uniqueid, description: challenge.description, status: challenge.challengeStatus  };
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
    orderByChallenge( ){
        this.challenges.sort((a, b): number => {
            if (a.challenge < b.challenge) { return 1; }
            if (a.challenge > b.challenge) { return -1; }
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
                this.close();
                console.log('success', result);
            },
            (error: any) => {
                console.log('error', error);
            }
        );
    }
   rejectChallenge(userid,uniqueid) {
        const completedChallenge = { userid: userid, uniqueid:uniqueid };
        this.challengeService.rejectChallenge(completedChallenge) .subscribe(
            (result: Challenge) => {
                this.challenges.length=0;
                this.getUsers();
                this.close();
                console.log('success', result);
            },
            (error: any) => {
                console.log('error', error);
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
