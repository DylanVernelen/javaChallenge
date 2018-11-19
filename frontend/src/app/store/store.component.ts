import { Component, OnInit } from '@angular/core';
import {Reward} from '../interfaces/reward';
import {RewardService} from '../services/reward.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styles: []
})
export class StoreComponent implements OnInit {

  constructor(public rewardService: RewardService) { }

  ngOnInit() {}

}
