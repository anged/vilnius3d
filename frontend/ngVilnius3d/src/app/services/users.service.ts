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

  getUsers(): Observable<User[]> {
    return this.apiService.get('/users').pipe(
      shareReplay(1)
    );
  }
  
}
