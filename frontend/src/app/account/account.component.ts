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

  firstChallenge = true;
  firstReward = true;

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
          this.getHistory();
        },
        (error: any) => {
          console.log('error', error);
          // this.setErrorMessage("Couldn't load the Users. Please try again later.");
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
      //datum = new Date(parseInt(challenge.timestampAdded, 10) * 1000, 10);


      timestamp = parseInt(challenge.timestampAdded, 10);
      if (timestamp) {
        datum = new Date(timestamp * 1000);
        item.timestampAdded = datum.toDateString();
      } else {
        item.timestampAdded = '/';
      }



      item.pointsAwarded = challenge.pointsAwarded;

      item.name = challenge.name;
      item.challengeWorth = challenge.worth;
      if (this.firstChallenge) {
        this.challengeList.fill(item);
        this.firstChallenge = false;
      } else {
        this.challengeList.push(item);
      }
      /*
      this.challengeService.getChallenge(challenge.challengeid)
        .subscribe(
          (result: Challenge) => {

            item.name = result.challengeName;
            item.challengeWorth = result.challengeWorth;
            if (this.firstChallenge) {
              this.challengeList.fill(item);
              this.firstChallenge = false;
            } else {
              this.challengeList.push(item);
            }
          },
          (error: any) => {
            console.log('error', error);
            // this.setErrorMessage("Couldn't load the Users. Please try again later.");
          }
        );*/
    }
  }

  getHistory() {
    for (const reward of this.account.history) {

      const item: History = new History();
      let datum: Date;



      item.opgehaald = (reward.opgehaald ? 1 : 0);


      datum = new Date(reward.timestamp);
      item.date = datum.getDate() + '/' + (datum.getMonth() + 1) + '/' + datum.getFullYear() + ' ' + datum.getHours() + ':' + datum.getMinutes() + ':' + datum.getSeconds();


      this.rewardService.getReward(reward.rewardid)
         .subscribe(
           (result: Reward) => {
             item.name = result.name;
             item.description = result.description;
             item.worth = result.worth;
             if (this.firstReward) {
               this.rewardList.fill(item);
               this.firstReward = false;
             } else {
               this.rewardList.push(item);
             }
           },
           (error: any) => {
             console.log('error', error);
             // this.setErrorMessage("Couldn't load the Users. Please try again later.");
           }
         );
    }
  }
}
