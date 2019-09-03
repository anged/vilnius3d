import { Injectable } from '@angular/core';

import { Scene } from '../models/scene.model';

import { Observable, from } from 'rxjs';
import { ApiService } from './api.service';
import { shareReplay, map, tap } from 'rxjs/operators';

import { UtilsAdmin } from '../admin/utils-admin';

@Injectable({
  providedIn: 'root'
})
export class ScenesService {

  constructor(private apiService: ApiService) { }

  getScenes(): Observable<Scene[]> {
    return this.apiService.get('/mapScenes').pipe(
      shareReplay(1)
    );
  }

  getScene(slug: string): Observable<Scene> {
    return this.getScenes().pipe(
      map(scenes => scenes.filter(sceneSingle => sceneSingle.slug === slug)[0])
    )
  }

  saveScene(scene: Scene, update: boolean = false): Observable<Scene> {
    // check if scene exists
    if (update) {
      return this.apiService.putExpress('/scene', UtilsAdmin.convertToFormData(scene));
    } else {
      console.log('IMG',  UtilsAdmin.convertToFormData(scene));
      return this.apiService.postExpress('/scene', UtilsAdmin.convertToFormData(scene));
    }
  }

  deleteScene(slug: string): Observable<Scene> {
    return this.apiService.deleteExpress(`/scene${slug}`);

  }
  
}
