import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'v3d-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthed$: Observable<boolean>;
  currentUser$: Observable<User>;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.isAuthed$ = this.userService.isAuthenticated$;
    this.currentUser$ = this.userService.currentUser$
  }

  logout(): void {
    this.userService.googleLogOut();
  }

}
