import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';

import {ManageUsersComponent} from './manage-users/manage-users.component';
import {ManageChallengesComponent} from './manage-challenges/manage-challenges.component';
import { LoginComponent } from 'src/app/login/login.component';
import {ManageRewardsComponent} from './manage-rewards/manage-rewards.component';

const routes: Routes = [

  {path: 'store', component: StoreComponent},
  {path: 'managechallenge', component: ManageChallengesComponent},
  {path: 'login', component: LoginComponent},
  {path: 'manageusers', component: ManageUsersComponent},
  {path: 'managerewards', component: ManageRewardsComponent}
  // {path: '', redirectTo: 'login', pathMatch: 'full'}
  // {path: '**', redirectTo: 'todo'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
