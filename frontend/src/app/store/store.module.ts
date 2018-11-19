import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { RewardComponent } from './reward/reward.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [StoreComponent, RewardComponent]
})
export class StoreModule { }
