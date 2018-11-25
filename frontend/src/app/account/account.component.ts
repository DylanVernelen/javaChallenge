import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {ChallengeList, History, HistoryList, UserFull} from '../interfaces/user-full';
import {ManageChallengesService} from '../services/manage-challenges.service';
import {Challenge} from '../interfaces/challenge';
import {RewardService} from '../services/reward.service';
import {Reward} from '../interfaces/reward';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styles: []
})
export class AccountComponent implements OnInit {

  account: UserFull;
  challengeList: [ChallengeList] = [
    {name: 'test',
      challengeWorth: 20,
      challengeStatus: 'test',
      timestampAdded: 'test',
      dateCompleted: 'test',
      pointsAwarded: 0,
      description: 'test'}
      ];
  rewardList: [History] = [{
    _id: '',
    rewardid: '',
    pointsSpent: 0,
    timestamp: 0,
    uniqueid: '',
    opgehaald: 0,
    name: '',
    worth: 0,
    date: '',
    description: ''
  }];

  constructor(private userService: UserService, private challengeService: ManageChallengesService, private rewardService: RewardService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser()
      .subscribe(
        (result: UserFull) => {
          this.account = result;
          this.getChallenges();
          this.challengeList.shift();
          this.getHistory();
          this.rewardList.shift();
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }

  getChallenges() {
    for (const challenge of this.account.challenges) {
      const item: ChallengeList = new ChallengeList();
      let datum: Date;

      item.description = challenge.description;
      item.challengeStatus = challenge.challengeStatus;

      if (parseInt(challenge.timestampAdded, 10)) {
        datum = new Date(parseInt(challenge.timestampAdded, 10) * 1000, 10);
        item.timestampAdded = datum.toDateString();
      } else {
        item.timestampAdded = '/';
      }

      let timestamp = parseInt(challenge.timestampCompleted, 10);

      if (timestamp) {
        datum = new Date(timestamp * 1000);
        item.dateCompleted = datum.toDateString();
      } else {
        item.dateCompleted = '/';
      }

      timestamp = parseInt(challenge.timestampAdded, 10);
      if (timestamp) {
        datum = new Date(timestamp * 1000);
        item.timestampAdded = datum.toDateString();
      } else {
        item.timestampAdded = '/';
      }

      item.pointsAwarded = challenge.pointsAwarded;

      this.challengeService.getChallenge(challenge.challengeid)
        .subscribe(
          (result: Challenge) => {

            item.name = result.challengeName;
            item.challengeWorth = result.challengeWorth;
            this.challengeList.push(item);
          },
          (error: any) => {
            console.log('error', error);
          }
        );
    }
  }

  getHistory() {
    for (const reward of this.account.history) {

      const item: History = new History();
      let datum: Date;



      item.opgehaald = (reward.opgehaald ? 1 : 0);


      if (reward.timestamp) {
        datum = new Date(reward.timestamp * 1000);
        item.date = datum.toDateString();
      } else {
        item.date = '/';
      }


      this.rewardService.getReward(reward.rewardid)
         .subscribe(
           (result: Reward) => {
             item.name = result.name;
             item.description = result.description;
             item.worth = result.worth;
             this.rewardList.push(item);
           },
           (error: any) => {
             console.log('error', error);
             // this.setErrorMessage("Couldn't load the Users. Please try again later.");
           }
         );
    }
  }
}
