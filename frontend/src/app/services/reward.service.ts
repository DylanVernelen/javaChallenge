import { Injectable } from '@angular/core';
import { Reward } from '../interfaces/reward';
import {Observable, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  rewardList: Reward[];
  subscription: Subscription;

  constructor(private http: HttpClient) {
    this.subscription = this.getAllRewards()
      .subscribe(rewardlist => { this.rewardList = rewardlist; });
  }

  getAllRewards(): Observable<Reward[]> {
    return this.http.get<Reward[]>('https://nodejs.tomvdr.com/node/api/reward/all');
  }
}
