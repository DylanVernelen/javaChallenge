import { Injectable } from '@angular/core';
import { Reward } from '../interfaces/reward';
import { HttpClient } from '@angular/common/http';
import {RewardCategory} from '../interfaces/reward-category';
import {User} from "../interfaces/user";
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  curentUser: User;
  token: string;

  constructor(private http: HttpClient) {
    this.getToken();
  }

  // Rewards

  getAllRewards() {
    return this.http.get<Reward[]>(environment.apiPath + 'reward/all?token=' + this.token, {responseType: 'json', withCredentials: false});
  }

  createReward(reward: {}) {
    return this.http.post(environment.apiPath + 'reward/create?token=' + this.token, reward, {responseType: 'json'});
  }

  deleteReward(id: string) {
    return this.http.delete(environment.apiPath + 'reward/delete/' + id + '?token=' + this.token);
  }

  buyReward(data: {}) {
    return this.http.post(environment.apiPath + 'reward/buy?token=' + this.token, data, {responseType: 'json'});
  }

  updateReward(reward: Reward) {
    return this.http.put(environment.apiPath + 'reward/update?token=' + this.token, reward, {responseType: 'json'});
  }

  // Categories

  getAllRewardCategories() {
    return this.http.get<RewardCategory[]>(environment.apiPath + 'rewardcategory/all?token=' + this.token, {responseType: 'json', withCredentials: false});
  }

  createCategory(category: RewardCategory) {
    // todo
  }

  removeCategory(id: string) {
    // todo
  }

  getReward(id: string) {
    this.getToken();
    return this.http.get(environment.apiPath + 'reward/get/' + id + '?token=' + this.token, {responseType: 'json'});
  }

  getToken() {
    const user_str = localStorage.getItem('currentUser');
    if (user_str !== null) {
      this.curentUser = JSON.parse(user_str);
      this.token = this.curentUser.token;
    } else {
      this.token = '';
    }
  }
}
