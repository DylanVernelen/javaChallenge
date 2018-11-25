import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {User} from '../interfaces/user';

@Injectable({providedIn: 'root'})
export class RoleGuardService implements CanActivate {

  user: User;

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    if (localStorage.getItem('currentUser')) {
      this.user = JSON.parse(localStorage.getItem('currentUser'));

      if (this.user.userLevel === 'admin') {
        // admin in so return true
        return true;
      }
    }

    // not logged in or no admin so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
