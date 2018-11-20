import { Injectable } from '@angular/core';
import { Challenge} from '../interfaces/challenge';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageChallengesService {

  constructor(private http: HttpClient) { }
    List: Challenge[] = [
        {challengeName: 'Beer', challengeOwner: 'Louis', challengeWorth: 5}
    ];
    createChallenge(challenge: Challenge) {
        console.log(challenge);
        return this.http.post('https://nodejs.tomvdr.com/node/api/challenge/create?token=ABCDEF', challenge, {responseType: 'json'} );

    }

    updateChallenge(challenge: Challenge, i: number) {
        this.List[i] = challenge;
    }

    deleteChallenge(i: number) {
        this.List.splice(i, 1);
    }
    getChallenges() {
      return this.http.get<Array<Challenge>>('https://nodejs.tomvdr.com/node/api/challenge/all?token=ABCDEF', {responseType: 'json'});
    }

}
