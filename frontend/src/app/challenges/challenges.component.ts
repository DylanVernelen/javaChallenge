import { Component, OnInit } from '@angular/core';
import {Challenge} from '../interfaces/challenge';
import {ManageChallengesService} from '../services/manage-challenges.service';
import {CompletedChallenge} from '../interfaces/completed-challenge';



@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  constructor(private manageChallengeService: ManageChallengesService ) { }
    challengeList: Challenge[];
  challenge: CompletedChallenge;
    points: Number ;
    user = JSON.parse(localStorage.getItem('currentUser'));
    userid = this.user.id;
  ngOnInit() {
      this.getAllChallenges();
      console.log(this.challengeList);
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
    completeChallenge( challengeId: number, info: String) {
      console.log(challengeId);
            if (challengeId !== 0 && info !== '') {
                const newCompletedChallenge = {userid: this.userid, challengeid: challengeId, info : info };
                console.log(newCompletedChallenge);
               this.manageChallengeService.createCompletedChallenge(newCompletedChallenge);
                this.getAllChallenges();
        }
    }

  onDropdownListChange(args) {
    const challenge = this.challengeList.filter(c => c._id === args.target.value);
    this.points = challenge[0].challengeWorth;
    console.log(challenge[0]);

 }

}
