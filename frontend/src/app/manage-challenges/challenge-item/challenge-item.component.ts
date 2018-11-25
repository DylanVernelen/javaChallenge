import {Component, Input, OnInit} from '@angular/core';
import {Challenge} from '../../interfaces/challenge';

@Component({
  selector: '[app-challenge-item]',
  templateUrl: './challenge-item.component.html',
  styleUrls: ['./challenge-item.component.scss']
})
export class ChallengeItemComponent implements OnInit {
  @Input() item: Challenge;
  @Input() index: number;
  constructor() { }

  ngOnInit() {
  }

  deleteChallenge() {}

}
