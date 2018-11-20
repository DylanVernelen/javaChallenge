import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../interfaces/user';
import {Reward} from '../../interfaces/reward';
import {RewardService} from '../../services/reward.service';

@Component({
  selector: '[app-reward-item]',
  templateUrl: './reward-item.component.html',
  styleUrls: ['./reward-item.component.scss']
})
export class RewardItemComponent implements OnInit {

  @Input() item: Reward;
  @Input() index: number;

  constructor(private rewardService: RewardService) { }

  ngOnInit() {
  }

  deleteReward() {
    this.rewardService.deleteReward(this.item.id.toString());
  }

}
