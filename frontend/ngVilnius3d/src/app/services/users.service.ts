import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { shareReplay } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private apiService: ApiService) { }

  // TODO change to get express
  getUsers(): Observable<User[]> {
    return this.apiService.getExpress('/users').pipe(
      shareReplay(1)
    );
    // return this.apiService.get('/users').pipe(
    //   shareReplay(1)
    // );
  }

  createUser(email: string): Observable<User> {
    console.log(email)
    return this.apiService.postExpress('/user', JSON.stringify({ email }));
  }

  deleteUser(id): Observable<User> {
    return this.apiService.deleteExpress(`/user/${id}`);
  }
  
  
}
