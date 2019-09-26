import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UsersService } from '../../services/users.service';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { User } from 'src/app/models/user.model';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  const fakeUsersService = jasmine.createSpyObj('usersService', ['getUsers']);
  const fakeUsers: User[] = [
    {   
      "id": 1,
      "uid": '54534',
      "name": "Andrius G",
      "image": "https://lh3.googleusercontent.com/a-/AAuE7mBJ6zr41hDJrrdnJMrNHvoI03CvUn5DFupIyDxHlA=s100-c",
      "email": "a.g@gmail.com",
      "role": "sAdmin"
  }, {
      "email": "jonas@gmail.com",
  }
  ]


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [ RouterTestingModule ],
      providers: [ 
        { provide: UsersService, useValue: fakeUsersService},
        { provide: HttpClient, useValue: {} },
        { provide: BsModalService, useValue: {} }, 
        { provide: ToastrService, useValue: {} }, 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have users', () => {
    const getUsersSpy = fakeUsersService.getUsers.and.returnValue(of(fakeUsers))
    component.ngOnInit();
    console.log('getUsersSpy', getUsersSpy, component.users$);
    component.users$.subscribe((users) => {
      console.log('USERS', users)
      // second user is registered but not authenticated
      expect(users).toEqual([fakeUsers[0]]);
    })

  });

  it('should have unauthenticated but registered users', () => {
    const getUsersSpy = fakeUsersService.getUsers.and.returnValue(of(fakeUsers))
    component.ngOnInit();
    console.log('getUsersSpy', getUsersSpy, component.users$);
    component.usersNotAuthed$.subscribe((users) => {
      expect(users).toEqual([fakeUsers[1]]);

      fixture.detectChanges();
      console.log(fixture.nativeElement.querySelector('h4').nodeType)

      expect(fixture.nativeElement.querySelector('h4').textContent).toBe('Užregistruoti, bet nepatvirtinę tapatybės');    })

  });

});
