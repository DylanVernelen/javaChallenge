import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';

import {ManageUsersComponent} from "./manage-users/manage-users.component";
import {ManageChallengesComponent} from "./manage-challenges/manage-challenges.component";

const routes: Routes = [

  {path: 'store', component: StoreComponent},
<<<<<<< HEAD
    {path: 'managechallenge', component: ManageChallengesComponent},
=======
  {path: 'admin', component: ManageUsersComponent}
>>>>>>> 72316845ae63d9c338bc28e3f1c7e8a8efd683f8
  // {path: '', redirectTo: 'login', pathMatch: 'full'}
  // {path: '**', redirectTo: 'todo'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
