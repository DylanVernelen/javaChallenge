import { Component, OnInit } from '@angular/core';
import {Challenge} from '../interfaces/challenge';
import {ManageChallengesService} from '../services/manage-challenges.service';
import {FormControl, FormGroup} from '@angular/forms';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from "../interfaces/user";

@Component({
  selector: 'app-manage-challenges',
  templateUrl: './manage-challenges.component.html',
  styleUrls: ['./manage-challenges.component.scss']
})
export class ManageChallengesComponent implements OnInit {
    activeModal: NgbActiveModal;
  constructor(private manageChallengeService: ManageChallengesService, private modal: NgbModal ) { }
    errorMessage: String;
    succeedMessage: String;
    challengeList: Challenge[];
    ngOnInit() {
    this.getAllChallenges();
  }
  getAllChallenges() {
    this.manageChallengeService.getChallenges()
      .subscribe(
        (result: Array<Challenge>) => {
          console.log('success', result);
          this.challengeList = result;
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }
 addChallenge(challengeName: string, challengeOwner: string, challengeWorth: string ) {
   if (challengeName.trim() !== '' && challengeOwner.trim() !== '' && challengeWorth.trim() !== '') {

       const newChallenge = { _id: null, challengeName: challengeName.trim(),
         challengeOwner :  challengeOwner.trim() , challengeWorth : parseInt(challengeWorth, 10) };
       this.manageChallengeService.createChallenge(newChallenge);
       this.getAllChallenges();
    }
     this.ngOnInit();
  }
    open(content) {
        this.activeModal = this.modal.open(content);
    }
    close() {
        this.activeModal.close();
    }
    deleteChallenge(id: string) {
      console.log(id);
      this.manageChallengeService.deleteChallenge(id)
          .subscribe(
              (result) => {
                  console.log('success', result);
                  this.close();
              },
              (error: any) => {
                  console.log('error', error);
                  this.close();
              }
          );
      this.ngOnInit();
  }
  updateChallenge(id, name , owner , worth) {
    if (name.trim() !== '' && worth.trim() !== '') {
        const newChallenge = { _id: id, challengeName: name, challengeOwner: owner, challengeWorth: worth}
        this.manageChallengeService.updateChallenge(newChallenge)
          .subscribe(
            (result: Challenge) => {
              console.log('success', result);
              this.close();
            },
            (error: any) => {
              console.log('failed', error)
              this.close();
            }
          );
    } else {
      this.errorMessage = 'Failed to add the user. Make sure email and user level are filled in.';
    }
}
}
