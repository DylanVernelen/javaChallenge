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

  constructor(public authenticationService: AuthenticationService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    if(this.user && this.user.email){
      this.authenticationService.login(this.user.email, this.user.password)
      .subscribe(
          data => {
            this.user = data
          },
          error => {
          });
    }
    this.authenticationService.userData$.subscribe(data => this.user = data);
  }

}
