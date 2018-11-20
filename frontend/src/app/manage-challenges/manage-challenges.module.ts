import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageChallengesComponent } from './manage-challenges.component';
import {ManageChallengesService} from "../services/manage-challenges.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ManageChallengesComponent],
    providers: [ManageChallengesService]
})
export class ManageChallengesModule { }
