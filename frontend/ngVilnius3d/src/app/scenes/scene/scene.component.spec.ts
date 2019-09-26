import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneComponent } from './scene.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeUrlPipe } from 'src/app/pipes/safe-url.pipe';
import { BlockUIModule } from 'ng-block-ui';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { ScenesService } from '../../services/scenes.service';
import { ScenesRoutingService } from '../scenes-routing.service';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('SceneComponent', () => {
  let component: SceneComponent;
  let fixture: ComponentFixture<SceneComponent>;
  let scenesServiceSpy = jasmine.createSpyObj('ScenesService', ['getSceneBySlug']);

  const fakeScene = {
    'id': 1,
    'title': 'Bendrojo plano 3d žemėlapis',
    'slug': 'bendrojo-plano-3d-zemelapis',
    'scene': 'https://vplanas.maps.arcgis.com/home/webscene/viewer.html?webscene=82b7ddc28e174e9da4b3cd6c157109e6',
    'img':'/uploads/04b3f2accc5a42f186957012e020fe0b.jpg'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SceneComponent,
        SafeUrlPipe
      ],
      providers: [
        { provide: 
          ActivatedRoute, 
          useValue: { paramMap: of(convertToParamMap({slug: 'bendrojo-plano-3d-zemelapis'})) }
        }, 
        { provide: HttpClient, useValue: {} },
        { provide: ScenesService, useValue: scenesServiceSpy }
      ],
      imports: [ RouterTestingModule, CommonModule, BlockUIModule.forRoot()]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneComponent);
    component = fixture.componentInstance;
    scenesServiceSpy = TestBed.get(ScenesService);
    // don't run detectChanges before spying
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have scene', () => {
    const spy = scenesServiceSpy.getSceneBySlug.and.returnValue(of(fakeScene))
    component.ngOnInit();
    component.scene$.subscribe((scene) => {
      console.log('SCENE:', scene)
      expect(scene).toEqual(fakeScene);
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });
});
