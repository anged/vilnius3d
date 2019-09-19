import { Component, OnInit, TemplateRef } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { trash16, arrowUpDown16, layerPolygonService16 } from '@esri/calcite-ui-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from '../../../environments/environment';
import { map, tap, catchError } from 'rxjs/operators';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';

interface IUserDeleted {
  success: boolean,
  userExists?: boolean 
}


@Component({
  selector: 'v3d-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  imgPath = environment.urlExpress;
  users$: Observable<User[]>;
  //Not first time authenticated users
  usersNotAuthed$: Observable<User[]>;
  iconRemove = trash16;
  iconUpload = arrowUpDown16;
  modal: BsModalRef;
  constructor(private usersService: UsersService, private userService: UserService, private bsModalService: BsModalService, private toastS: ToastrService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users$ = this.usersService.getUsers().pipe(
      tap(users => console.log('Users', users)),
      map((users: User[]) => users.filter((user: User) => user.name && user.uid)),
      catchError(err => {
        // TODO change logic, as current sollution redirect front end as well, 
        console.log('User err', err);
        if (err.status === 401) {
          this.userService.destroyCurrentAuth();
        }
        return of([]);
      })
    );
    this.usersNotAuthed$ = this.usersService.getUsers().pipe(
      map((users: User[]) => users.filter((user: User) => !user.name && !user.uid))
    );
  }

    // Move modal boilerplate to seperate component
    openModal(template: TemplateRef<any>) {
      this.modal = this.bsModalService.show(template, { class: 'modal-sm' });
    }
  
    confirmDelete(id): void {
      this.modal.hide();
      this.usersService.deleteUser(id).subscribe((data: User | IUserDeleted) => {
        console.log('POST data', data);
        if ((data as IUserDeleted).success) {
          this.toastS.success('Vartotojas sėkmingai ištrintas');
          this.getUsers();
        } else {
          this.toastS.error('Vartotojo ištrinti nepavyko');
        }
      });
    }
  
    decline(): void {
      this.modal.hide();
    }
  
}
