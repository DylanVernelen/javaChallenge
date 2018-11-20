import { Component, OnInit } from '@angular/core';
import {Challenge} from "../interfaces/challenge";
import {ManageChallengesService} from "../services/manage-challenges.service";

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {

  constructor(private manageChallengeService: ManageChallengesService ) { }
    challengeList: Challenge[];
  ngOnInit() {
  }
    getAllChallenges() {
        this.manageChallengeService.getChallenges()
            .subscribe(
                (result: Array<Challenge>) => {
                    console.log('success', result);
                    this.challengeList = result;
                },
                (error: any) => {
                    console.log('error', error);
                }
            );
    }
}
