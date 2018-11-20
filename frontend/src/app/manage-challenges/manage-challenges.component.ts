import { Component, OnInit } from '@angular/core';
import {Challenge} from '../interfaces/challenge';
import {ManageChallengesService} from '../services/manage-challenges.service';

@Component({
  selector: 'app-manage-challenges',
  templateUrl: './manage-challenges.component.html',
  styleUrls: ['./manage-challenges.component.scss']
})
export class ManageChallengesComponent implements OnInit {

  constructor(private manageChallengeService: ManageChallengesService ) { }
  challengeList: Challenge[];
  ngOnInit() {

  }

}
