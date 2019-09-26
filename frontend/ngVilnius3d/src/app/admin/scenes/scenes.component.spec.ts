import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScenesComponent } from './scenes.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ScenesService } from '../../services/scenes.service';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';


describe('ScenesAdminComponent', () => {
  let component: ScenesComponent;
  let fixture: ComponentFixture<ScenesComponent>;
  let scenesServiceSpy: jasmine.SpyObj<ScenesService>;

  const fakeScenes = [
    {
    'id': 1,
    'title': 'Bendrojo plano 3d žemėlapis',
    'slug': 'bendrojo-plano-3d-zemelapis',
    'scene': 'https://vplanas.maps.arcgis.com/home/webscene/viewer.html?webscene=82b7ddc28e174e9da4b3cd6c157109e6',
    'img':'/uploads/04b3f2accc5a42f186957012e020fe0b.jpg'
  }, {
    'id': 2,
    'title': 'Bendrojo plano 3d žemėlapis 2',
    'slug': 'bendrojo-plano-3d-zemelapis-2',
    'scene': 'https://vplanas.maps.arcgis.com/home/webscene/viewer.html?webscene=82b7ddc28e174e9da4b3cd6c157109e6',
    'img':'/uploads/04b3f2accc5a42f186957012e020fe0b.jpg'
  }
];

  beforeEach(async(() => {
    scenesServiceSpy = jasmine.createSpyObj('ScenesService', ['getScenes'])
    TestBed.configureTestingModule({
      declarations: [ ScenesComponent ],
      providers: [  
        { provide: HttpClient, useValue: {} },
        { provide: ScenesService, useValue: scenesServiceSpy }//,
        // { provide: ApiService, useValue: {} }
      ],
      imports: [ RouterTestingModule ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScenesComponent);
    component = fixture.componentInstance;
    scenesServiceSpy = TestBed.get(ScenesService);
    // don't run detectChanges before spying
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have scenes', () => {
    const spy = scenesServiceSpy.getScenes.and.returnValue(of(fakeScenes))
    component.ngOnInit();
    component.scenes$.subscribe((scenes) => {
      console.log('Scenos', scenes)
      // fixture.detectChanges();
      expect(scenes).toEqual(fakeScenes);
      expect(spy).toHaveBeenCalledTimes(1);
    })
  });
});
