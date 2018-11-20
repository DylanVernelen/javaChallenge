import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgBootstrapModule } from './sharedModules/ng-bootstrap.module';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { StoreModule } from './store/store.module';
import { UserItemComponent } from './manage-users/user-item/user-item.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {ManageChallengesComponent} from "./manage-challenges/manage-challenges.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ManageUsersComponent,
<<<<<<< HEAD
      ManageChallengesComponent,
      UserItemComponent,
=======
    UserItemComponent,
>>>>>>> 72316845ae63d9c338bc28e3f1c7e8a8efd683f8
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgBootstrapModule,
<<<<<<< HEAD
      StoreModule,
     HttpClientModule,
      FormsModule,
  ],
  providers: [
=======
    StoreModule,
    HttpClientModule,
    FormsModule
>>>>>>> 72316845ae63d9c338bc28e3f1c7e8a8efd683f8
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
