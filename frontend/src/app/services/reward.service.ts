import { Injectable } from '@angular/core';
import { Reward } from '../interfaces/reward';
import {Observable, Subscription} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {RewardCategory} from '../interfaces/reward-category';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  constructor(private http: HttpClient) {}

  getAllRewards() {
    return this.http.get<Reward[]>('https://nodejs.tomvdr.com/node/api/reward/all?token=ABCDEF', {responseType: 'json'});
  }

  getAllRewardCategories() {
    return this.http.get<RewardCategory[]>('https://nodejs.tomvdr.com/node/api/reward/all?token=ABCDEF', {responseType: 'json'});
  }
}
