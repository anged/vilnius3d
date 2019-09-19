import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { subscribeOn, distinctUntilChanged, catchError } from 'rxjs/operators';
import { JwtService } from './jwt.service';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

// declare global google api const
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private oAuth2Instance: any;
  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  // private isAuthenticatedSubject = new BehaviorSubject(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  currentUser$ = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private http: HttpClient,
    private jwtService: JwtService,
    private apiService: ApiService
    ) {
    // this.isAuthenticatedSubject.next(false);
    gapi.load('auth2', this.initClient);
  }

  initClient() {
    gapi.auth2.init({
      client_id: '987096005741-rh4dh76plqme1litg8d82etk5elu3d01.apps.googleusercontent.com'
    });
  }

  googleLogin() {
    this.oAuth2Instance = gapi.auth2.getAuthInstance();
    this.oAuth2Instance.signIn().then((user)=> {
      this.loginAuth(user);
      console.log('Success', user)
    });
  }

  loginAuth(user: any) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `${user.Zi.toke_type} ${user.Zi.access_token}`
      })
    }

    this.http.post<any>(`${environment.urlExpress}/auth`, user.Zi, options)
      .subscribe((res) => {
        console.log('Express res', res);
        const token = res.token;
        console.log('Token', token);
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
          console.log('Log out')
          this.router.navigate(['/login']);
        })
      });
    }

    this.destroyCurrentAuth();

  }

  populate() {
    if (this.jwtService.getToken()) {
      this.apiService.getExpress('/auth/user')
      .subscribe(
        res => {
          console.log(res)
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
    console.log('User authenticated', user)
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  destroyCurrentAuth() {
    console.error('destroyCurrentAuth')
    this.jwtService.removeToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }
}
