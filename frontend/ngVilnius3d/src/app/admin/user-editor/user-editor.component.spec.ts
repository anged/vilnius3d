import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditorComponent } from './user-editor.component';
import { FormsModule } from '@angular/forms';
import { EmailValidatorDirective } from './email-validator.directive';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../../services/users.service';

describe('UserEditorComponent', () => {
  let component: UserEditorComponent;
  let fixture: ComponentFixture<UserEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditorComponent, EmailValidatorDirective ],
      providers: [ 
        { provide: HttpClient, useValue: {} },
        { provide: ToastrService, useValue: {} },
        UsersService
      
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
