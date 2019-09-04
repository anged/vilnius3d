import { Component, OnInit, TemplateRef } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { trash16, arrowUpDown16 } from '@esri/calcite-ui-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'v3d-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;
  iconRemove = trash16;
  iconUpload = arrowUpDown16;
  modal: BsModalRef;
  constructor(private usersService: UsersService, private bsModalService: BsModalService) { }

  ngOnInit() {
    this.users$ = this.usersService.getUsers();
  }

    // Move modal boilerplate to seperate component
    openModal(template: TemplateRef<any>) {
      this.modal = this.bsModalService.show(template, { class: 'modal-sm' });
    }
  
    confirmDelete(id): void {
      this.modal.hide();
      this.usersService.deleteUser(id).subscribe(data => {
        console.log('POST data', data);
      });
    }
  
    decline(): void {
      this.modal.hide();
    }
  

}
