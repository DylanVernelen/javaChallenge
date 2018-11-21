import { Injectable } from '@angular/core';
import { Challenge} from '../interfaces/challenge';
import {CompletedChallenge} from '../interfaces/completed-challenge';
import {HttpClient} from '@angular/common/http';
import {User} from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class ManageChallengesService {

  constructor(private http: HttpClient) { }

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

    updateChallenge(challenge: Challenge, i: number) {

    }

    deleteChallenge(id: String) {
console.log(id);
        return this.http.delete('https://nodejs.tomvdr.com/node/api/challenge/delete/' + id + '?token=ABCDEF', {responseType: 'json'});

    }
    getChallenges() {
      return this.http.get<Array<Challenge>>('https://nodejs.tomvdr.com/node/api/challenge/all?token=ABCDEF', {responseType: 'json'});
    }
    createCompletedChallenge(challenge: CompletedChallenge) {
        return this.http.post('https://nodejs.tomvdr.com/node/api/challenge/request?token=ABCDEF', challenge, {responseType: 'json'})

    }

}
