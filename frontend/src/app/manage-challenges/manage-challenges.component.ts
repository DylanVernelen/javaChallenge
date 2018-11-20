import { Component, OnInit } from '@angular/core';
import {Challenge} from '../interfaces/challenge';
import {ManageChallengesService} from '../services/manage-challenges.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-manage-challenges',
  templateUrl: './manage-challenges.component.html',
  styleUrls: ['./manage-challenges.component.scss']
})
export class ManageChallengesComponent implements OnInit {

  constructor(private manageChallengeService: ManageChallengesService ) { }
  form: FormGroup;
  challengeList: Challenge[];
  ngOnInit() {
    this.getAllChallenges();
    console.log(this.challengeList);
    this.form = new FormGroup({
      ChallengeOwner : new FormControl(''),
      ChallengeName : new FormControl(''),
      ChallengeWorth : new FormControl(''),
    });
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
  addChallenge(challenge: string) {
    if (challenge.trim() !== '') {
      const newChallenge = { };
      this.manageChallengeService.createChallenge(newChallenge)
        .catch(function (error) {
          console.log(error);
        });
    }
  }

}
