import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ManageUsersComponent} from "./manage-users/manage-users.component";

const routes: Routes = [
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
