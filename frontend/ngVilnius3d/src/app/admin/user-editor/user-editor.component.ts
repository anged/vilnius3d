import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user.model';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';

interface IUserAdded {
  success: boolean,
  userExists?: boolean 
}

@Component({
  selector: 'v3d-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {
  emailType = 'gmail';
  email: string;

  constructor(private usersService: UsersService, private toastS: ToastrService) { }

  ngOnInit() { }

  onSubmit(): void {
    console.log(this.email);
    this.usersService.createUser(this.email).subscribe((data: User | IUserAdded) => {
      console.log('data', data, (data as IUserAdded).success);
      // TODO pipe and add messages:
      // success
      // error + reasons
      if ((data as IUserAdded).success) {
        this.toastS.success('Vartotojas sėkmingai pridėtas')
      } else if ((data as IUserAdded).userExists) {
        this.toastS.error('Vartotojas su šiuo el. paštu jau yra priregistruotas')
      } else {
        this.toastS.error('Nepavyko pridėti vartotojo')
      } 

    });
  }

}
