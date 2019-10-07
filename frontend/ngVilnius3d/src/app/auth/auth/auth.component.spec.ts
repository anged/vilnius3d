import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExtraOptions, Route, Router } from '@angular/router';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  const routerSpy = jasmine.createSpyObj('Router', {
    'getCurrentNavigation': {
      extras:  {
        state: { tknExpired: true }
      }
    }
  });


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthComponent ],
      imports: [
        // https://angular.io/api/router/testing/RouterTestingModule
        RouterTestingModule.withRoutes(
          [{path: 'login', component: AuthComponent}] as Route[], { extras : {state: { tknExpired: true }}} as ExtraOptions
        ),
        HttpClientTestingModule
      ],
      providers: [ { provide: Router, useValue: routerSpy } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
