import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpGetMockup: HttpTestingController;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [
      { provide: HttpClient, usValue: {} }
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(ApiService)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
