import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { UserService } from '../../services/user.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient } from '@angular/common/http';


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  
  beforeEach(() => {
    window['gapi'] = {
      load() { return null; }
    }
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileComponent ],
      imports: [ RouterTestingModule ],
      providers: [ 
        UserService,
        { provide: HttpClient, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
