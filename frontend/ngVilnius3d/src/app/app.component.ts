import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { Router, NavigationEnd, RoutesRecognized } from '@angular/router';
import { filter, distinctUntilChanged, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'v3d-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngVilnius3d';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.populate();

    // Share route event for initiating breadcrumb in child routes
    this.router.events.pipe(
      filter(event => event instanceof RoutesRecognized),
      tap((route) => console.log('ROUTE', route)),
      shareReplay(1)
    )
  }
}
