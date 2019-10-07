import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { JwtService } from '../services/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  jwts: JwtHelperService;
  constructor(private userService: UserService, private router: Router, private jwt: JwtService) {
    this.jwts = new JwtHelperService();
   }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const token = this.jwt.getToken();
    const isExpired = this.jwts.isTokenExpired(token);
    return this.userService.isAuthenticated$.pipe(
      tap(a => {
        if (!a || isExpired) {
          this.router.navigate(['/login']);
        }
        
      }),
      map(isAuth => isAuth && !isExpired),
      take(1)
      );
  }

}
