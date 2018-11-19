import { Injectable } from '@angular/core';
import { Reward } from '../interfaces/reward';
import {Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  rewardList: Observable<Reward[]> = this.getAllRewards();

  constructor(private http: HttpClient) {}

  getAllRewards(): Observable<Reward[]> {
    return this.http.get<Reward[]>('https://nodejs.tomvdr.com/node/api/reward/all');
  }
}
