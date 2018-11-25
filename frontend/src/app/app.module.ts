import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgBootstrapModule } from './sharedModules/ng-bootstrap.module';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ManageChallengesComponent } from './manage-challenges/manage-challenges.component';
import { StoreModule } from './store/store.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import {HttpModule} from '@angular/http';

import { ManageRewardsModule } from './manage-rewards/manage-rewards.module';
import { ChallengesComponent } from 'src/app/challenges/challenges.component';
import { AdminComponent } from './admin/admin.component';
import {ManageUsersModule} from "./manage-users/manage-users.module";
import {AccountModule} from "./account/account.module";
import {AccountComponent} from './account/account.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ManageChallengesComponent,
    HomeComponent,
    ChallengesComponent,
    AdminComponent,
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
    ManageRewardsModule,
    ManageUsersModule,
    AccountModule
  ],
  providers: [
    StoreModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
