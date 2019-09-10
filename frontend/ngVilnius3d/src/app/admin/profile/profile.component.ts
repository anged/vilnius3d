import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'v3d-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser$: Observable<User>;
  imgPath = environment.urlExpress;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.currentUser$ = this.userService.currentUser$
  }

}
