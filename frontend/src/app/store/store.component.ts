import { Component, OnInit } from '@angular/core';
import {Reward} from '../interfaces/reward';
import {RewardService} from '../services/reward.service';

import {User} from '../interfaces/user';

import {Observable, Subscription} from 'rxjs';
import {Oid, RewardCategory} from '../interfaces/reward-category';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styles: []
})
export class StoreComponent implements OnInit {

  rewardList: Reward[];
  rewardCategoryList: RewardCategory[] = [
    {id: new Oid('0'), categoryName: 'Consumables'},
    {id: new Oid('0'), categoryName: 'Coupons'},
    {id: new Oid('0'), categoryName: 'Gadgets'}
    ];
  rewardSubscription: Subscription;

  constructor(private rewardService: RewardService) { }

  ngOnInit() {
    this.rewardSubscription = this.rewardService.getAllRewards()
      .subscribe(
        (result: Reward[]) => {
          this.rewardList = result;
        },
        (error: any) => {
          console.log('error', error);
        }
      );

    // this.rewardService.getAllRewardCategories()
    //   .subscribe(
    //     (result: RewardCategory[]) => {
    //       this.rewardCategoryList = result;
    //     },
    //     (error: any) => {
    //       console.log('error', error);
    //     }
    //   );
  }

  OnDestroy() {
    this.rewardSubscription.unsubscribe();
  }

  filter(category) {
    console.log('Het werkt!');
    for (const reward of this.rewardList) {
      if (reward.rewardCategory !== category) {
        const index = this.rewardList.indexOf(reward, 0);
        this.rewardList.splice(index, 1);
      }
    }
  }

}
