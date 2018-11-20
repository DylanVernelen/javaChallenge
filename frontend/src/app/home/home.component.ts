import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(public AuthenticationService: AuthenticationService) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    if (this.user && this.user.email) {
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
