import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeScenesComponent } from './home-scenes.component';

describe('HomeScenesComponent', () => {
  let component: HomeScenesComponent;
  let fixture: ComponentFixture<HomeScenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeScenesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
