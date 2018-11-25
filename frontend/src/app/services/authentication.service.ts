import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';
import {UserFull} from '../interfaces/user-full';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    userData$: BehaviorSubject<UserFull> = new BehaviorSubject(null);
    constructor(private http: HttpClient, private router: Router) { }

    login(email: string, password: string) {
        return this.http.post<any>(environment.apiPath + 'token/validate', { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                console.log(user)
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    user.password = password;
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.userData$.next({
                        email: user.email,
                        _id: user.id,
                        password: user.password,
                        pointCount: user.pointCount,
                        token: user.token,
                        userLevel: user.userLevel,
                        challenges: user.challenges,
                        history: user.history
                    });
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.userData$.next(null);
        this.router.navigate(['/home']);
    }
}
