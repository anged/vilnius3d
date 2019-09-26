import { TestBed, inject } from '@angular/core/testing';

import { ScenesService } from './scenes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

describe('ScenesService', () => {
  let service: ScenesService;

  const fakeScenes =[ {
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

  // article about HttpClient tests: https://blog.angulartraining.com/how-to-write-unit-tests-for-angular-code-that-uses-the-httpclient-429fa782eb15

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ ScenesService ],
    imports: [ HttpClientTestingModule ]
  }));

  beforeEach(() => {
    service = TestBed.get(ScenesService);
  });

  // Check that there are no outstanding requests
  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch map scenes', inject([HttpTestingController, ScenesService], 
    (httpMock: HttpTestingController, scenesService: ScenesService) => {

      scenesService.getScenes().subscribe((scenes) => {
        console.log('Service scenes', scenes)
        expect(scenes.length).toBe(2);
        expect(scenes).toEqual(fakeScenes);
      });

      // HttpClient mock
      // url should match
      const req = httpMock.expectOne(`${environment.urlExpress}/scenes`);
      expect(req.request.method).toEqual('GET');
      req.flush(fakeScenes);
  }));

});
