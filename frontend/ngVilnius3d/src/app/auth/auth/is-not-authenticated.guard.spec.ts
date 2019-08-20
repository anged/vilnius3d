import { TestBed, async, inject } from '@angular/core/testing';

import { IsNotAuthenticatedGuard } from './is-not-authenticated.guard';

describe('IsAuthenticatedGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsNotAuthenticatedGuard]
    });
  });

  it('should ...', inject([IsNotAuthenticatedGuard], (guard: IsNotAuthenticatedGuard) => {
    expect(guard).toBeTruthy();
  }));
});
