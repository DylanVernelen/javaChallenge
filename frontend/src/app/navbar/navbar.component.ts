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
  
  constructor(public AuthenticationService: AuthenticationService) { }

  ngOnInit() {
    this.AuthenticationService.fetchUser().subscribe((user: User) =>{
      this.user = user;
      if(user){
        console.log(this.user.email + " <- User in navbar-component");
      } else {
        console.log('No logged in user');
      }
    })
  }

}
