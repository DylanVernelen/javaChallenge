import {Injectable} from '@angular/core';
import {Challenge} from '../interfaces/challenge';
import {CompletedChallenge} from "../interfaces/completed-challenge";
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/user';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageChallengesService {

  curentUser: User;
  token: string;

  constructor(private http: HttpClient) {
    this.getToken();
  }

  createChallenge(challenge: any) {
    return this.http.post(environment.apiPath + 'challenge/create?token=' + this.token, challenge, {responseType: 'json'});
  }

  updateChallenge(challenge: Challenge) {
    return this.http.patch(environment.apiPath + 'challenge/update?token=' + this.token, challenge, {responseType: 'json'});
  }

  deleteChallenge(id: String) {
    return this.http.delete(environment.apiPath + 'challenge/delete/' + id + '?token=' + this.token, {responseType: 'json'});
  }

  getChallenges() {
    return this.http.get<Array<Challenge>>(environment.apiPath + 'challenge/all?token=' + this.token, {responseType: 'json'});
  }



  createCompletedChallenge(challenge: any) {
    return this.http.post(environment.apiPath + 'challenge/request?token=' + this.token, challenge, {responseType: 'json'})
  }
  acceptChallenge(challenge :any) {
    console.log(challenge);
    return this.http.post(environment.apiPath + 'challenge/completed?token=' + this.token, challenge, {responseType: 'json'})

}
    rejectChallenge(challenge :any) {
    console.log(challenge);
        return this.http.post(environment.apiPath + 'challenge/rejected?token=' + this.token, challenge, {responseType: 'json'})

    }
  getChallenge(id: String) {
    console.log(id);
    this.getToken();
    return this.http.get(environment.apiPath + 'challenge/get/' + id + '?token=' + this.token, {responseType: 'json'});
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
