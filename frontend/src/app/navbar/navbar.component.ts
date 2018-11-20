import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isCollapsed = true;

  user: User;

  constructor(public AuthenticationService: AuthenticationService) {
    console.log(JSON.parse(localStorage.getItem('currentUser')));
    console.log(this.user);
    this.user = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    if(this.user && this.user.email){
      console.log("lijn24")
      this.AuthenticationService.login(this.user.email, this.user.password)
      .subscribe(
          data => {
            this.user = data
          },
          error => {
          });
    }
    this.AuthenticationService.userData$.subscribe(data => this.user = data);
  }

}
