import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgBootstrapModule } from './sharedModules/ng-bootstrap.module';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
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
import { ChallengesComponent } from 'src/app/challenges/challenges.component';
import { AccountComponent } from 'src/app/account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ManageUsersComponent,
    ManageChallengesComponent,
    UserItemComponent,
    HomeComponent,
    ChallengesComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgBootstrapModule,
    StoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ManageRewardsModule
  ],
  providers: [
    StoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
