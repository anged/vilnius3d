import { TestBed, inject } from '@angular/core/testing';

import { ScenesService } from './scenes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { environment } from '../../environments/environment';

describe('ScenesService', () => {
  let service: ScenesService;
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
  }};

  // article about HttpClient tests: https://blog.angulartraining.com/how-to-write-unit-tests-for-angular-code-that-uses-the-httpclient-429fa782eb15

  beforeEach(() => TestBed.configureTestingModule({
    providers: [ ApiService ],
    imports: [ HttpClientTestingModule ]
  }));

  it('should be created', () => {
    service = TestBed.get(ScenesService);
    expect(service).toBeTruthy();
  });

  it('should fetch map scenes', inject([HttpTestingController, ApiService], 
    (httpMock: HttpTestingController, apiService: ApiService) => {

      apiService.get('/mapScenes').subscribe((scenes) => {
        console.log('Service scenes', scenes)
        expect(scenes.length).toBe(1);
        expect(scenes[0]).toEqual(fakeScene);
      });

      // HttpClient mock
      // url should match
      const req = httpMock.expectOne(environment.url  + '/mapScenes');
      expect(req.request.method).toEqual('GET');
      req.flush([fakeScene]);
  }));

  // in order to check all expectations use afterEach
  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

});
