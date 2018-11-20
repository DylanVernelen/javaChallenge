import { Component, OnInit } from '@angular/core';
import {Challenge} from "../interfaces/challenge";
import {ManageChallengesService} from "../services/manage-challenges.service";
import {CompletedChallenge} from "../interfaces/completed-challenge";

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  constructor(private manageChallengeService: ManageChallengesService ) { }
    challengeList: Challenge[];
  points =5;
  user = localStorage.getItem('currentUser');
   /* userId=user._Id;*/
  ngOnInit() {
      this.getAllChallenges();
      console.log(this.challengeList);
      console.log(this.user);
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
    completeChallenge( challengeId: number, info: String){
      console.log(challengeId);
            if (challengeId != 0 && info !== '') {
                const newCompletedChallenge = {userid: 1, challengeid: challengeId, info : info };
                console.log(newCompletedChallenge);
               /* this.manageChallengeService.createCompletedChallenge(newCompletedChallenge);*/
                this.getAllChallenges();
        }
    }

}
