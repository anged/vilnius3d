import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, ReplaySubject, throwError, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { distinctUntilChanged, catchError } from 'rxjs/operators';

import { User } from '../models/user.model';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

// declare global google api const
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jwts: JwtHelperService;
  private oAuth2Instance: any;
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private isRejectedUserSubject = new Subject<boolean>();
  isRejectedUser$ = this.isRejectedUserSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  currentUser$ = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient,
    private jwtService: JwtService,
    private apiService: ApiService
    ) {
    gapi.load('auth2', this.initClient);
    this.jwts = new JwtHelperService();
  }

  initClient() {
    gapi.auth2.init({
      client_id: environment.clid
    });
  }

  googleLogin() {
    this.oAuth2Instance = gapi.auth2.getAuthInstance();
    this.oAuth2Instance.signIn().then((user)=> {
      this.loginAuth(user);
    });
  }

  loginAuth(user: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${user.Zi.toke_type} ${user.Zi.access_token}`
      })
    }

    this.http.post<any>(`${environment.urlExpress}/auth`, user.Zi, options).pipe(
        catchError((err) =>  {
          this.isRejectedUserSubject.next(true)
          return throwError(err);
        })
      )
      .subscribe((res) => {
        const token = res.token;
        this.jwtService.storeToken(token);
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(res);
        this.ngZone.run(() => {
          this.router.navigate(['/admin']);
        });
      });
  }

  googleLogOut() {
    const oAuth2Instance = gapi.auth2.getAuthInstance();
    if (oAuth2Instance) {
      const user = oAuth2Instance.currentUser.get();
      oAuth2Instance.disconnect();

      oAuth2Instance.signOut().then(() => {
        user.disconnect();
        this.ngZone.run(() => {
          this.router.navigate(['/login']);
        })
      });
    }

    this.destroyCurrentAuth();

  }

  populate() {
    const token = this.jwtService.getToken();
    if (token && !this.jwts.isTokenExpired(token)) {
      this.apiService.getExpress('/auth/user')
      .subscribe(
        res => {
          this.setCurrentAuth(res)
        },
        err => this.destroyCurrentAuth()
      );
    } else {
      // Remove previous auth states if exists
      this.destroyCurrentAuth();
    }
  }

  setCurrentAuth(user) {
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  destroyCurrentAuth() {
    this.jwtService.removeToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }
}
