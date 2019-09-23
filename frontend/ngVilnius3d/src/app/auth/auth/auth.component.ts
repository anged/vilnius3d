import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'v3d-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  date = new Date().getFullYear();
  expired: boolean;
  isUserRejected: boolean;
  isAuthenticating = false;
  private destroy$ = new Subject<boolean>(); 

  constructor(private userService: UserService, private router: Router, private cdr: ChangeDetectorRef ) {
    const state = this.router.getCurrentNavigation().extras.state
    if (state) {
      this.expired = state.tknExpired ? true: false;
    }

  }

  ngOnInit() {
    this.userService.isRejectedUser$.pipe(takeUntil(this.destroy$)).subscribe((isRejected: boolean) => {
      this.isUserRejected = isRejected;

      // Set isAuthenticating to false only when user rejection,
      // otherwise component gets destroyed
      this.isAuthenticating = false;
      this.cdr.detectChanges();
    }); 
  }

  login() {
    this.isAuthenticating = true;
    this.userService.googleLogin();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
