import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageChallengesComponent } from './manage-challenges.component';
import {ManageChallengesService} from '../services/manage-challenges.service';
import {ChallengeItemComponent} from './challenge-item/challenge-item.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ChallengeItemComponent],
    providers: [ManageChallengesService]
})
export class ManageChallengesModule { }
