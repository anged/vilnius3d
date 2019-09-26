import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

describe('UserService', () => {
  const mockRouter  = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ 
      { provide: Router, useValue: mockRouter }, 
      { provide: HttpClient, useValue: {} }
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
