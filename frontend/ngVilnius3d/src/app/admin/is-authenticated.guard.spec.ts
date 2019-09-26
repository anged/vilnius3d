import { TestBed, async, inject } from '@angular/core/testing';

import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { of } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('IsAuthenticatedGuard', () => {
  const mockRouter  = {
    navigate: jasmine.createSpy('navigate')
  };
  let userServiceSpy: jasmine.SpyObj<UserService>;
  
  beforeEach(() => {
    window['gapi'] = {
      load() { return null; }
  }});

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserService', ['isAuthenticated$'])
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: spy },
      ]
    });
    userServiceSpy = TestBed.get(UserService);
  });

  it('should be created and navigated to login if user is not authed', () => {
    const service: IsAuthenticatedGuard = TestBed.get(IsAuthenticatedGuard);

    userServiceSpy.isAuthenticated$ = of(false);

    service.jwts.isTokenExpired = () => true;

    expect(service).toBeTruthy();
    service.canActivate(<any>{}, <any>{}).subscribe( (canActivate) => {
      expect(canActivate).toBeFalsy();
      console.log('canActivate', canActivate, service.jwts.isTokenExpired());
    })
    console.log('navigate', mockRouter.navigate);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should be activated if user is authed', () => {
    const service: IsAuthenticatedGuard = TestBed.get(IsAuthenticatedGuard);

    userServiceSpy.isAuthenticated$ = of(true);

    service.jwts.isTokenExpired = () => false;

    expect(service).toBeTruthy();
    service.canActivate(<any>{}, <any>{}).subscribe( (canActivate) => {
      expect(canActivate).toBeTruthy();
      console.log('canActivate', canActivate, service.jwts.isTokenExpired());
    })

  });

});
