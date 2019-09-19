import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';
import { map, take } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { JwtService } from '../../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class IsNotAuthenticatedGuard implements CanActivate {
  // TODO create DI
  jwts: JwtHelperService;
  constructor(private userService: UserService, private router: Router, private jwt: JwtService) {
    this.jwts = new JwtHelperService();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isAuthenticated$.pipe(
      take(1),
      // Can activate if user is not authenticated
      map(isAuth => {
        const token = this.jwt.getToken();
        const isExpired = this.jwts.isTokenExpired(token);
        console.log('guard', isAuth)
        if (isAuth && !isExpired) {
          this.router.navigate(['/admin/dashboard']);
        }

        return !isAuth || isExpired;
      })
    )
  }
  
}
