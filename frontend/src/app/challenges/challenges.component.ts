import { Component, OnInit } from '@angular/core';
import {Challenge} from '../interfaces/challenge';
import {ManageChallengesService} from '../services/manage-challenges.service';
import {CompletedChallenge} from '../interfaces/completed-challenge';
import {User} from "../interfaces/user";



@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  constructor(private manageChallengeService: ManageChallengesService ) { }
    challengeList: Challenge[];
    challenge: CompletedChallenge;
    pointsinmessage: String;
    points: Number ;
    user = JSON.parse(localStorage.getItem('currentUser'));
    userid = this.user.id;
    succesMessage: string;
    errorMessage: string;
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
    this.succesMessage = '';
    this.errorMessage = '';
      console.log(challengeId);
            if (challengeId !== 0 && info !== '') {
                const newCompletedChallenge = {userid: this.userid, challengeid: challengeId, info : info };
                this.pointsinmessage = this.points.toString() + ' points.';
                if (this.points === 1) {
                    this.pointsinmessage = this.points.toString() + ' point.';
                }
              this.points = null;
               this.manageChallengeService.createCompletedChallenge(newCompletedChallenge)
                   .subscribe(
                       (result: Challenge) => {
                           this.errorMessage = '';
                           (async () => {
                               this.succesMessage = 'Request succesfully. If your request is accepted, you have earned '
                                 + this.pointsinmessage ;

                               await this.delay(8000);
                               this.succesMessage = '';
                               this.pointsinmessage = null;
                           })();
                       },
                       (error: any) => {
                           this.succesMessage = '';
                           (async () => {
                               this.errorMessage = 'Failed request. Try again later.';
                               await this.delay(5000);
                               this.errorMessage = '';
                           })();
                       }
                   );
                this.getAllChallenges();
        } else {
              (async () => {
                this.errorMessage = 'Every field must be filled in.';
                await this.delay(5000);
                this.errorMessage = '';
              })();
            }
    }

  onDropdownListChange(args) {
    const challenge = this.challengeList.filter(c => c._id === args.target.value);
    this.points = challenge[0].challengeWorth;
    console.log(challenge[0]);

 }
     delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }

}
