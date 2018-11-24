import { Injectable } from '@angular/core';
import { Reward } from '../interfaces/reward';
import { HttpClient } from '@angular/common/http';
import {RewardCategory} from '../interfaces/reward-category';
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class RewardService {

  curentUser: User;
  token: string;

  constructor(private http: HttpClient) {}

  // Rewards

  getAllRewards() {
    return this.http.get<Reward[]>('https://nodejs.tomvdr.com/node/api/reward/all?token=ABCDEF', {responseType: 'json', withCredentials: false});
  }

  createReward(reward: {}) {
    return this.http.post('https://nodejs.tomvdr.com/node/api/reward/create?token=ABCDEF', reward, {responseType: 'json'});
  }

  deleteReward(id: string) {
    return this.http.delete('https://nodejs.tomvdr.com/node/api/reward/delete/' + id + '?token=ABCDEF');
  }

  buyReward(data: {}) {
    return this.http.post('https://nodejs.tomvdr.com/node/api/reward/buy?token=ABCDEF', data, {responseType: 'json'});
  }

  updateReward(reward: Reward) {
    return this.http.put('https://nodejs.tomvdr.com/node/api/reward/update?token=ABCDEF', reward, {responseType: 'json'});
  }

  // Categories

  getAllRewardCategories() {
    return this.http.get<RewardCategory[]>('https://nodejs.tomvdr.com/node/api/category/all?token=ABCDEF', {responseType: 'json', withCredentials: false});
  }

  createCategory(category: RewardCategory) {
    // todo
  }

  removeCategory(id: string) {
    // todo
  }

  getReward(id: string) {
    this.getToken();
    return this.http.get('https://nodejs.tomvdr.com/node/api/reward/get/' + id + '?token=' + this.token, {responseType: 'json'});
  }

  getToken(){
    const user_str = localStorage.getItem("currentUser");
    if (user_str !== null) {
      this.curentUser= JSON.parse(user_str);
      this.token = this.curentUser.token;
    } else {
      this.token="";
    }
  }
}
