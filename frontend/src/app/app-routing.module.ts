import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import {ManageUsersComponent} from './manage-users/manage-users.component';
import {ManageChallengesComponent} from './manage-challenges/manage-challenges.component';
import { LoginComponent } from 'src/app/login/login.component';
import {ManageRewardsComponent} from './manage-rewards/manage-rewards.component';
<<<<<<< HEAD
import {ChallengesComponent} from "./challenges/challenges.component";
import {AccountComponent} from './account/account.component';
=======
import { HomeComponent } from 'src/app/home/home.component';
>>>>>>> Homepage

const routes: Routes = [

  // {path: 'store', component: StoreComponent},
  {path: 'managechallenge', component: ManageChallengesComponent},
  {path: 'admin', component: ManageUsersComponent},
  {path: 'login', component: LoginComponent},
  {path: 'manageusers', component: ManageUsersComponent},
  {path: 'managerewards', component: ManageRewardsComponent},
<<<<<<< HEAD
  {path: 'challenges', component: ChallengesComponent},
  {path: 'account', component: AccountComponent},
  // {path: '', redirectTo: 'login', pathMatch: 'full'}
=======
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
>>>>>>> Homepage
  // {path: '**', redirectTo: 'todo'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
