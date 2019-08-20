import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthenticatedGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isAuthenticated$.pipe(
      take(1),
      // Can activate if user is not authenticated
      map(isAuth => {
        if (isAuth) {
          this.router.navigate(['/admin']);
        }

        return !isAuth;
      })
    )
  }

  
}
