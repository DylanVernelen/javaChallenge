import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgBootstrapModule } from './sharedModules/ng-bootstrap.module';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageChallengesComponent } from './manage-challenges/manage-challenges.component';
import { StoreModule } from './store/store.module';
import { UserItemComponent } from './manage-users/user-item/user-item.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import {HttpModule} from '@angular/http';

import { ManageRewardsModule } from './manage-rewards/manage-rewards.module';
<<<<<<< HEAD
import {ChallengesModule} from "./challenges/challenges.module";
import { AccountModule } from './account/account.module';
=======
import { HomeComponent } from './home/home.component';
>>>>>>> Homepage

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ManageUsersComponent,
    ManageChallengesComponent,
    UserItemComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgBootstrapModule,
    StoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ManageRewardsModule,
      ChallengesModule,
      AccountModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    StoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
