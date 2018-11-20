import { Injectable } from '@angular/core';
import { Challenge} from '../interfaces/challenge';
import {HttpClient} from '@angular/common/http';
import {User} from "../interfaces/user";

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
        return this.http.post('https://nodejs.tomvdr.com/node/api/challenge/create?token=ABCDEF', challenge, {responseType: 'json'})
    .subscribe(
            (result: User) => {
                this.getChallenges();
                console.log('success', result);

            },
            (error: any) => {
                console.log('error', error);
            }
        );
    }

    updateChallenge(challenge: Challenge, i: number) {
        this.List[i] = challenge;
    }

    deleteChallenge(i: number) {
        return this.http.delete('https://nodejs.tomvdr.com/node/api/challenge/get/' + i + '?token=ABCDEF', {responseType: 'json'});

    }
    getChallenges() {
      return this.http.get<Array<Challenge>>('https://nodejs.tomvdr.com/node/api/challenge/all?token=ABCDEF', {responseType: 'json'});
    }

}
