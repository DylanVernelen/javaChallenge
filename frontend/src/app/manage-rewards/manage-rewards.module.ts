import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageRewardsComponent } from './manage-rewards.component';
import { RewardItemComponent } from './reward-item/reward-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ManageRewardsComponent, RewardItemComponent]
})
export class ManageRewardsModule { }
