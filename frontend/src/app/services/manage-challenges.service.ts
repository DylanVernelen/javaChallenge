import {Injectable} from '@angular/core';
import {Challenge} from '../interfaces/challenge';
import {CompletedChallenge} from '../interfaces/completed-challenge';
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ManageChallengesService {

  curentUser: User;
  token: string;

  constructor(private http: HttpClient) {
  }

  createChallenge(challenge: Challenge) {
    console.log(challenge);
    return this.http.post('https://nodejs.tomvdr.com/node/api/challenge/create?token=ABCDEF', challenge, {responseType: 'json'})
      .subscribe(
        (result: Challenge) => {
          this.getChallenges();
          console.log('success', result);

        },
        (error: any) => {
          console.log('error', error);
        }
      );
  }

  updateChallenge(challenge: Challenge) {
    console.log(challenge);
    return this.http.patch('https://nodejs.tomvdr.com/node/api/challenge/update?token=ABCDEF', challenge, {responseType: 'json'});
  }

  deleteChallenge(id: String) {
    console.log(id);
    console.log('gaat deleten');
    return this.http.delete('https://nodejs.tomvdr.com/node/api/challenge/delete/' + id + '?token=ABCDEF', {responseType: 'json'});

  }

  getChallenges() {
    return this.http.get<Array<Challenge>>('https://nodejs.tomvdr.com/node/api/challenge/all?token=ABCDEF', {responseType: 'json'});
  }

  createCompletedChallenge(challenge: CompletedChallenge) {
    return this.http.post('https://nodejs.tomvdr.com/node/api/challenge/request?token=ABCDEF', challenge, {responseType: 'json'})

  }

  getChallenge(id: string){
    this.getToken();
    return this.http.get('https://nodejs.tomvdr.com/node/api/challenge/get/' + id + '?token=' + this.token, {responseType: 'json'});
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
