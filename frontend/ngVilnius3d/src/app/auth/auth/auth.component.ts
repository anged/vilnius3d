import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'v3d-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  date = new Date().getFullYear();
  expired: boolean;

  constructor(private userService: UserService, private router: Router ) {
    const state = this.router.getCurrentNavigation().extras.state
    if (state) {
      this.expired = state.tknExpired ? true: false;
    }

  }

  ngOnInit() {
  }

  login() {
    this.userService.googleLogin();
  }

}
