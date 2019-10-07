import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { User } from '../models/user.model';
import { ApiService } from './api.service';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService) { }

  getUsers(): Observable<User[]> {
    return this.apiService.getExpress('/users').pipe(
      shareReplay(1)
    );
  }

  createUser(email: string): Observable<Message> {
    console.log(email)
    return this.apiService.postExpress('/user', JSON.stringify({ email }));
  }

  deleteUser(id): Observable<Message> {
    return this.apiService.deleteExpress(`/user/${id}`);
  }
  
  
}
