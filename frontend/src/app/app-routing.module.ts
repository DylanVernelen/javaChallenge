import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';
import { ManageUsersComponent} from './manage-users/manage-users.component';
import { ManageChallengesComponent} from './manage-challenges/manage-challenges.component';
import { LoginComponent } from 'src/app/login/login.component';
import { ManageRewardsComponent} from './manage-rewards/manage-rewards.component';
import { ChallengesComponent} from './challenges/challenges.component';
import { AccountComponent} from './account/account.component';
import { HomeComponent } from 'src/app/home/home.component';
import {AdminComponent} from "./admin/admin.component";
import {AcceptChallengesComponent} from "./accept-challenges/accept-challenges.component";
import {AuthGuard} from './guards/auth.guard';
import {RoleGuardService} from './guards/role-guard.service';

const routes: Routes = [
  {path: 'store', component: StoreComponent, canActivate: [AuthGuard]},
  {path: 'managechallenge', component: ManageChallengesComponent, canActivate: [RoleGuardService]},
  {path: 'acceptchallenges', component: AcceptChallengesComponent, canActivate: [RoleGuardService]},
  {path: 'admin', component: AdminComponent, canActivate: [RoleGuardService]},
  {path: 'login', component: LoginComponent},
  {path: 'manageusers', component: ManageUsersComponent, canActivate: [RoleGuardService]},
  {path: 'managerewards', component: ManageRewardsComponent, canActivate: [RoleGuardService]},
  {path: 'challenges', component: ChallengesComponent, canActivate: [AuthGuard]},
  {path: 'account', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'store', component: StoreComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: '*', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
