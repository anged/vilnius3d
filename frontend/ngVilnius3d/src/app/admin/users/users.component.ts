import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { trash16, arrowUpDown16 } from '@esri/calcite-ui-icons';

@Component({
  selector: 'v3d-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  iconRemove = trash16;
  iconUpload = arrowUpDown16;
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.users$ = this.usersService.getUsers();
  }

}
