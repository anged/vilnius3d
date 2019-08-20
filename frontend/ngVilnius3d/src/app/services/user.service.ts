import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

// declare global google api const
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private oAuth2Instance: any;
  private isAuthenticatedSubject = new ReplaySubject<boolean>();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private router: Router, private ngZone: NgZone) {
    // TEMP pass value
    this.isAuthenticatedSubject.next(false);

    gapi.load('auth2', this.initClient);
  }

  initClient() {
    gapi.auth2.init({
      client_id: '987096005741-rh4dh76plqme1litg8d82etk5elu3d01.apps.googleusercontent.com'
    });
  }

  googleLogin() {
    this.oAuth2Instance = gapi.auth2.getAuthInstance();
    this.oAuth2Instance.signIn().then((s)=> {
      this.isAuthenticatedSubject.next(true);
      this.ngZone.run(() => this.router.navigate(['/admin']))
      console.log('Success', s)
    });
  }

  googleLogOut() {
    const oAuth2Instance = gapi.auth2.getAuthInstance();
    this.oAuth2Instance.disconnect();
    oAuth2Instance.signOut().then(() => {
      this.isAuthenticatedSubject.next(false);
      this.ngZone.run(() => this.router.navigate(['/admin']))
    });
  }
}
