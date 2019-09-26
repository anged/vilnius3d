import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [
      { provide: HttpClient, usValue: {} }
    ]
  }));

  it('should be created', () => {
    const service = TestBed.get(ApiService);

    expect(service).toBeTruthy();
  });

});
