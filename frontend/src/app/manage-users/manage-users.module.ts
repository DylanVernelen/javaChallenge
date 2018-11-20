import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CommonModule} from '@angular/common';

import { FormsModule } from '@angular/forms';
import { UserItemComponent } from './user-item/user-item.component';
import {ManageUsersService} from '../services/manage-users.service';
import {ManageUsersComponent} from './manage-users.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [ManageUsersComponent, UserItemComponent],
  providers: [ManageUsersService]
})
export class ManageUsersModule { }
