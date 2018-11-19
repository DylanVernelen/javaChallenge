import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreComponent } from './store/store.component';

import {ManageUsersComponent} from "./manage-users/manage-users.component";

const routes: Routes = [

  {path: 'store', component: StoreComponent},
  {path: 'admin', component: ManageUsersComponent}
  // {path: '', redirectTo: 'login', pathMatch: 'full'}
  // {path: '**', redirectTo: 'todo'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
