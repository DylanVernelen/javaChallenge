import { Component, OnInit } from '@angular/core';
import {Reward} from '../interfaces/reward';
import {RewardService} from '../services/reward.service';

import {RewardCategory} from '../interfaces/reward-category';


@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styles: []
})
export class StoreComponent implements OnInit {
  sortedOnWorth: true ;
  rewardList: Reward[];
  rewardListShown: Reward[];
  rewardCategoryList: RewardCategory[];
  rewardCategoryListFiltered: string[];

  constructor(private rewardService: RewardService) { }

  ngOnInit() {
    this.rewardCategoryListFiltered = [];

    this.rewardService.getAllRewards()
      .subscribe(
        (result: Reward[]) => {
          this.rewardList = result;
          this.shortenDescriptions();
          this.rewardListShown = result;
        },
        (error: any) => {
          console.log('error', error);
        }
      );

    this.rewardService.getAllRewardCategories()
      .subscribe(
        (result: RewardCategory[]) => {
          this.rewardCategoryList = result;
        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }
  filterOnWorth(by) {
      if (this)
    if (by.toString() == 'asc') {
        this.rewardListShown.sort((a,b): number => {
            if(a.worth>b.worth) return 1;
            if(a.worth<b.worth) return -1;
            return 0;
        });
    }
      if (by.toString() == 'desc') {
          this.rewardListShown.sort((a,b): number => {
              if(a.worth<b.worth) return 1;
              if(a.worth>b.worth) return -1;
              return 0;
          });
      }


  }

  filter(filterCategory) {
    if (!this.rewardCategoryListFiltered.includes(filterCategory)) {
      this.rewardCategoryListFiltered.push(filterCategory);
    } else {
      const index = this.rewardCategoryListFiltered.indexOf(filterCategory);
      this.rewardCategoryListFiltered.splice(index, 1);
    }

    this.rewardListShown = [];
    for (const reward of this.rewardList) {
      if (this.rewardCategoryListFiltered.length !== 0) {
        for (const category of this.rewardCategoryListFiltered) {
          if (reward.category === category) {
            this.rewardListShown.push(reward);
          }
        }
      } else {
        this.rewardListShown.push(reward);
      }
    }
  }

  shortenDescriptions() {
    for (const reward of this.rewardList) {
      if (reward.description && reward.description.length >= 30) {
        reward['shortDescription'] = reward.description.substr(0, 30) + ' ...';
      } else {
        reward['shortDescription'] = reward.description;
      }
    }
  }
}
