import {Component, Input, OnInit} from '@angular/core';

class Todo {
}

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {

  @Input() item: Todo;
  @Input() index: number;

  constructor() { }

  ngOnInit() {
  }

}
