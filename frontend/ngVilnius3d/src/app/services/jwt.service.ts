import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  // TODO: use https://www.npmjs.com/package/angular-webstorage-service 
  // for better testable code

  getToken(): string {
    return window.localStorage.getItem('tkn');
  }

  storeToken(token: string): void {
    window.localStorage.setItem('tkn', token);
  }

  removeToken(): void {
    window.localStorage.removeItem('tkn');
  } 

}
