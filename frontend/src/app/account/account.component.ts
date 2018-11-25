import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {ChallengeList, HistoryList, UserFull} from '../interfaces/user-full';
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
      dateAdded: 'test',
      dateCompleted: 'test',
      pointsAwarded: 0,
      description: 'test'}
      ];

  rewardList: [HistoryList] = [{name: 'test', description: 'test',
    worth: 10, date: 'test', opgehaald: false, }];

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
          console.log('success', result);
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
      datum = new Date(parseInt(challenge.timeStampAdded) * 1000);
      item.dateAdded = datum.getDate() + '/' + (datum.getMonth() + 1) + '/' + datum.getFullYear() + ' ' + datum.getHours() + ':' + datum.getMinutes() + ':' + datum.getSeconds();
      datum = new Date(parseInt(challenge.timeStampCompleted) * 1000);
      item.dateCompleted = datum.getDate() + '/' + (datum.getMonth() + 1) + '/' + datum.getFullYear() + ' ' + datum.getHours() + ':' + datum.getMinutes() + ':' + datum.getSeconds();
      item.pointsAwarded = challenge.pointsAwarded;
      this.challengeService.getChallenge(challenge.challengeid)
        .subscribe(
          (result: Challenge) => {
            console.log('success', result);
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
        );
    }
  }

  getHistory() {
    for (const reward of this.account.history) {
      const item: HistoryList = new HistoryList();
      let datum: Date;
      item.opgehaald = reward.opgehaald;
      datum = new Date(parseInt(reward.timeStamp) * 1000);
      item.date = datum.getDate() + '/' + (datum.getMonth() + 1) + '/' + datum.getFullYear() + ' ' + datum.getHours() + ':' + datum.getMinutes() + ':' + datum.getSeconds();
      this.rewardService.getReward(reward.rewardId)
        .subscribe(
          (result: Reward) => {
            console.log('success', result);
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
