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
    this.getToken();
    return this.http.get<Reward[]>(environment.apiPath + 'reward/all?token=' + this.token, {responseType: 'json', withCredentials: false});
  }

  createReward(reward: {}) {
    this.getToken();
    return this.http.put(environment.apiPath + 'reward/create?token=' + this.token, reward, {responseType: 'json'});
  }

  deleteReward(id: string) {
    this.getToken();
    return this.http.delete(environment.apiPath + 'reward/delete/' + id + '?token=' + this.token);
  }

  buyReward(data: {}) {
    this.getToken();
    return this.http.post(environment.apiPath + 'reward/buy?token=' + this.token, data, {responseType: 'json'});
  }

  updateReward(reward: Reward) {
    this.getToken();
    return this.http.patch(environment.apiPath + 'reward/update?token=' + this.token, reward, {responseType: 'json'});
  }

  // Categories

  getAllRewardCategories() {
    this.getToken();
    return this.http.get<RewardCategory[]>(environment.apiPath + 'rewardcategory/all?token=' + this.token, {responseType: 'json', withCredentials: false});
  }

  createCategory(category: {}) {
    this.getToken();
    return this.http.put(environment.apiPath + 'rewardcategory/create?token=' + this.token, category, {responseType: 'json'});
  }

  removeCategory(id: string) {
    this.getToken();
    return this.http.delete(environment.apiPath + 'rewardcategory/delete/' + id + '?token=' + this.token);
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
