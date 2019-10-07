import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { UsersService } from './users.service';
import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { Message } from '../models/message.model';

describe('UsersService', () => {
  let service: UsersService;
  let httpGetMockup: HttpTestingController;
  let httpPostMockup: HttpTestingController;
  let httpPutMockup: HttpTestingController;
  const mockRouter  = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule ],
    providers: [ UsersService, ApiService, 
      { provide: Router, useValue: mockRouter } ]
  }));

  beforeEach(() => {
    service = TestBed.get(UsersService);
    httpGetMockup = TestBed.get(HttpTestingController);
    httpPostMockup = TestBed.get(HttpTestingController);
    httpPutMockup = TestBed.get(HttpTestingController);
  });


  // Check that there are no outstanding requests
  afterEach(() => {
    httpGetMockup.verify();
  });

  it('should GET the API users', () => {
    // const apiService = TestBed.get(ApiService);
    const mockUsers: User[] = [
      {
        "id": 36454,
        "name": "Jonas",
        "email": "jonas@gmail.com",
        "image": "https://lh3.googleusercontent.com/a-/AAuE7mBJ6zr41hDJrrdnJMrNHvoI03CvUn5DFupIyDxHlA=s100-c",
        "role": "admin"
      }
    ]
    service.getUsers().subscribe((users: User[]) => {
      expect(users.length).toBe(1);
    });

    const requestGet = httpGetMockup.expectOne(`${environment.urlExpress}/users`);
  
    expect(requestGet.request.method).toBe('GET');
    requestGet.flush(mockUsers);
    expect(service).toBeTruthy();
  });

  
  it('should POST the API user', () => {
    const mockMessage: Message = {
      'message': 'User created',
      'success': true
  };

    service.createUser('dummy@gmail.com').subscribe((msg: Message) => {
      expect(msg).toEqual(mockMessage);
    });

    const requestPost = httpGetMockup.expectOne(`${environment.urlExpress}/user`);
  
    expect(requestPost.request.method).toBe('POST');
    requestPost.flush(mockMessage);
  });
  
  it('should DELETE the API user', () => {
    const mockMessage: Message = {
        'message': 'User deleted',
        'success': true
    };

    service.deleteUser(1).subscribe((msg: Message) => {
      expect(msg).toEqual(mockMessage);
    });

    const requestPost = httpGetMockup.expectOne(`${environment.urlExpress}/user/1`);
  
    expect(requestPost.request.method).toBe('DELETE');
    requestPost.flush(mockMessage);
  });

});
