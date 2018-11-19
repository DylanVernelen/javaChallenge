import { Injectable } from '@angular/core';
import { Reward } from '../interfaces/reward';
import { Oid } from '../interfaces/reward';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  rewardList: Reward[] = [
    {id: new Oid('0'), rewardName: 'Reward1', rewardWorth: 1},
    {id: new Oid('1'), rewardName: 'Reward2', rewardWorth: 2},
    {id: new Oid('2'), rewardName: 'Reward3', rewardWorth: 3}
  ];

  constructor() {
  }

  createItem(item: Reward) {
    this.rewardList.unshift(item);
  }

  updateItem(item: Reward, i: number) {
    this.rewardList[i] = item;
  }

  deleteItem(i: number) {
    this.rewardList.splice(i, 1);
  }
}
