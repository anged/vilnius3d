import { TestBed } from '@angular/core/testing';

import { ScenesRoutingService } from './scenes-routing.service';

describe('ScenesRoutingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScenesRoutingService = TestBed.get(ScenesRoutingService);
    expect(service).toBeTruthy();
  });
});
