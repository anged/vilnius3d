import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenesComponent } from './scenes.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ScenesPublicComponent', () => {
  let component: ScenesComponent;
  let fixture: ComponentFixture<ScenesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScenesComponent ],
      imports: [ BrowserAnimationsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and sidebar not activated', () => {
    console.log('ScenesPublicComponent', component);
    expect(component).toBeDefined();
    expect(component.isSidebarActive).toBeFalsy();
  });

  it('should toggle sidebar state', () => {
    component.toggleSidebar();
    expect(component.isSidebarActive).toBe(true, 'true at first');
    component.toggleSidebar();
    expect(component.isSidebarActive).toBe(false, 'false at second toggle');
  });
});
