import { Component, OnInit } from '@angular/core';
import {Reward} from '../interfaces/reward';
import {RewardService} from '../services/reward.service';
import {Observable} from 'rxjs';
import {Users} from '../interfaces/users';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styles: []
})
export class StoreComponent implements OnInit {

  rewardList: Reward[];

  constructor(private rewardService: RewardService) { }

  ngOnInit() {
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
