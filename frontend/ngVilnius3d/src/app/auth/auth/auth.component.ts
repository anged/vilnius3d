import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'v3d-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  date = new Date().getFullYear();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  login() {
    this.userService.googleLogin();
  }

}
