import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneEditorComponent } from './scene-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { BreadcrumbService } from 'angular-crumbs';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ScenesService } from 'src/app/services/scenes.service';

describe('SceneEditorComponent', () => {
  let component: SceneEditorComponent;
  let fixture: ComponentFixture<SceneEditorComponent>;
  let scenesService: ScenesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneEditorComponent ],
      providers: [ BreadcrumbService, 
      { provide: BsModalService, useValue: {} }, 
      { provide: ToastrService, useValue: {} }, 
      { provide: HttpClient, useValue: {} }
    ],
      imports: [ ReactiveFormsModule, RouterTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneEditorComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
