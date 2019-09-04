import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'v3d-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {
  emailType = 'gmail';
  email: string;

  constructor(private usersService: UsersService) { }

  ngOnInit() { }

  onSubmit(): void {
    console.log(this.email);
    this.usersService.createUser(this.email).subscribe((data) => {
      // TODO pipe and add messages:
      // success
      // error + reasons
    });
  }

}
