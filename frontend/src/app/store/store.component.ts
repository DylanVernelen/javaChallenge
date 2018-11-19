import { Component, OnInit } from '@angular/core';
import {Reward} from '../interfaces/reward';
import {RewardService} from '../services/reward.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styles: []
})
export class StoreComponent implements OnInit {

  rewardList: Reward[];

  constructor(private rewardService: RewardService) { }

  ngOnInit() {
    this.rewardList = this.rewardService.rewardList;
  }

}
