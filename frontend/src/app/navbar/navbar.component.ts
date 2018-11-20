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
    this.AuthenticationService.userData$.subscribe(data => this.user = data);
  }

}
