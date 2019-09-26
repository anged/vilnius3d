import { TestBed, async, inject } from '@angular/core/testing';

import { IsNotAuthenticatedGuard } from './is-not-authenticated.guard';
import { UserService } from 'src/app/services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('IsNotAuthenticatedGuard', () => {
  const mockRouter  = {
    navigate: jasmine.createSpy('navigate')
  };
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let service: IsNotAuthenticatedGuard;

  beforeEach(() => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['isAuthenticated$'])
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        IsNotAuthenticatedGuard,
        { provide: Router, useValue: mockRouter },
        { provide: UserService, useValue: userServiceSpy },
      ]
    });

    userServiceSpy = TestBed.get(UserService);
    service = TestBed.get(IsNotAuthenticatedGuard);

  });

  it('should be created and navigated to admin if user is authed', () => {
    userServiceSpy.isAuthenticated$ = of(true);
    service.jwts.isTokenExpired = () => false;

    expect(service).toBeTruthy();
    service.canActivate(<any>{}, <any>{}).subscribe( (canActivate) => {
      expect(canActivate).toBeFalsy();
      console.log('IsNotAuthenticatedGuard', canActivate, service.jwts.isTokenExpired());
    })
    console.log('navigate', mockRouter.navigate);

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/admin/dashboard']);
  });

});
