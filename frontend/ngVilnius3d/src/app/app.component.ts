import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'v3d-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngVilnius3d';

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.populate();
  }
}
