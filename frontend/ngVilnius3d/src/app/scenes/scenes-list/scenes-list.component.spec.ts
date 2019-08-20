import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenesListComponent } from './scenes-list.component';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ScenesService } from '../../services/scenes.service';
import { ScenesRoutingService } from '../scenes-routing.service';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserModule } from '@angular/platform-browser';
import { ScenesRoutingModule } from '../scenes-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';
import { ScenesComponent } from '../scenes.component';
import { SceneComponent } from '../scene/scene.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ScenesListComponent', () => {
  let component: ScenesListComponent;
  const fakeScene = {
    'id': 1,
    'title': 'Bendrojo plano 3d žemėlapis',
    'slug': 'bendrojo-plano-3d-zemelapis',
    'description': 'Vilniaus miesto savivaldybės teritorijos bendrasis planas nurodo miesto teritorinės plėtros gaires planuojamam laikotarpiui. Jis aiškiai nubrėžia Vilniaus miesto plėtros kryptis ir prioritetus.',
    'production': 1,
    'sceneUrl': 'https://vplanas.maps.arcgis.com/home/webscene/viewer.html?webscene=82b7ddc28e174e9da4b3cd6c157109e6',
    'content': null,
    'created_at': 1561033911592,
    'updated_at': 1561036218609,
    'photo': {
      'id': 1,
      'name': 'feel_like_youre_not_enough_1200x627.jpg',
      'hash': '04b3f2accc5a42f186957012e020fe0b',
      'sha256': 'DJLL-TBzKr98DNxUUOXPAgSdcyEMehjvEwobsRl9HkQ',
      'ext': '.jpg',
      'mime': 'image/jpeg',
      'size': '34.86',
      'url': '/uploads/04b3f2accc5a42f186957012e020fe0b.jpg',
      'provider': 'local',
      'public_id': null,
      'created_at': 1561036218663,
      'updated_at': 1561036218718
    }
  };

  // using spy obj
  const fakeScenesService = jasmine.createSpyObj('scenesService', ['getScenes']);
  const fakeScenesRoutingService = null;

  // using real service
  const scenesService = new ScenesService(null)

  beforeEach(() => {
    component = new ScenesListComponent(fakeScenesService, fakeScenesRoutingService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have scenes', () => {
    const spy = fakeScenesService.getScenes.and.returnValue(of([fakeScene]))
    component.ngOnInit();
    component.scenes$.subscribe((scenes) => {
      console.log('SCENES', scenes)
      expect(scenes).toEqual([fakeScene]);
      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });
});
