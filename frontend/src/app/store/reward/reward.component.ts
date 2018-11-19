import {Component, Input, OnInit} from '@angular/core';
import {Reward} from '../../interfaces/reward';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {

  @Input() item: Reward;

  constructor() { }

  ngOnInit() {
  }

}
