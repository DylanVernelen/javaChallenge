import { Component, OnInit } from '@angular/core';
import {RewardService} from '../services/reward.service';
import {Reward} from '../interfaces/reward';
import {RewardCategory} from '../interfaces/reward-category';
import {User} from '../interfaces/user';

@Component({
  selector: 'app-manage-rewards',
  templateUrl: './manage-rewards.component.html',
  styles: []
})
export class ManageRewardsComponent implements OnInit {

  rewardList: Reward[];
  rewardCategoryList: RewardCategory[] = [
    {id: '0', categoryName: 'Consumables'},
    {id: '0', categoryName: 'Coupons'},
    {id: '0', categoryName: 'Gadgets'}
  ];

  constructor(public rewardService: RewardService) { }

  ngOnInit() {
    this.getRewards();
  }

  addReward(name: string, worth: number, category: string, description: string) {
    const reward = {name: name, worth: worth, category: category, description: description};
    console.log(reward);
    this.rewardService.createReward(reward)
      .subscribe(
        (result: Reward) => {
          console.log('success', result);
          this.getRewards();
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }

  getRewards() {
    this.rewardService.getAllRewards()
      .subscribe(
        (result: Reward[]) => {
          this.rewardList = result;
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }

}
