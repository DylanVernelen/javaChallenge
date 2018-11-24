import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import {UserService} from "../services/user.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AccountComponent],
  providers: [UserService]
})
export class AccountModule { }
