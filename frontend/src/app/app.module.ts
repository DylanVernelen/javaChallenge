import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgBootstrapModule } from './sharedModules/ng-bootstrap.module';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    ManageUsersComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgBootstrapModule,


  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
