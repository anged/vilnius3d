import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

// Using coockie service for mobile devices only
@Injectable({
  providedIn: 'root'
})
export class CookieVilniusService {
  // Add modal window to inform about data consumtpion in mobile env if cookie has not been set
  cookieMobile: string;
  private name = '_vpMobile';
  private value = 'accept';
  // 14 days
  // ms * s * min * hours * days * months
  private time = 1000*60*60*24*14*1;

  constructor(
    private cookieService: CookieService,
  ) { }

  // Currently using oly for dev
  deleteCookie() {
    this.cookieService.delete(this.name);
  }

  setCookie() {
    this.cookieService.set(this.name, this.value, this.time);
    this.cookieMobile = this.value;
  }

  getCookie(): string {
    return this.cookieMobile = this.cookieService.get(this.name);
  }

  checkCookie(): string {
    if (this.cookieMobile) {
      return this.cookieMobile;
    } else {
      return this.getCookie();
    }

  }
}
