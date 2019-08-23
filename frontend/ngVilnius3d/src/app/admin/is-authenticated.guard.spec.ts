import { TestBed } from '@angular/core/testing';

import { IsAuthenticatedGuard } from './is-authenticated.guard';

describe('IsAuthenticatedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsAuthenticatedGuard = TestBed.get(IsAuthenticatedGuard);
    expect(service).toBeTruthy();
  });
});
