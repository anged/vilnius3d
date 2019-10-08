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
  private frontEndScenes$: Observable<Scene[]>;
  constructor(private apiService: ApiService) { }

  getScenes(): Observable<Scene[]> {
    return this.apiService.getExpress('/scenes').pipe(
      shareReplay({ refCount: false, bufferSize: 1 })
    );
  }

  // caching only in public app
  getPublicScenes(): Observable<Scene[]> {
    if (this.frontEndScenes$) {
      return this.frontEndScenes$;
    }

    this.frontEndScenes$ = this.apiService.getExpress('/scenes').pipe(
      shareReplay({ refCount: false, bufferSize: 1 })
    );

    return this.frontEndScenes$;
  }

  getScene(id: string): Observable<Scene> {
    return this.getScenes().pipe(
      map(scenes => scenes.filter(sceneSingle => sceneSingle.id.toString() === id)[0])
    )
  }

  getSceneBySlug(slug: string): Observable<Scene> {
    return this.getScenes().pipe(
      tap((a) => { console.log('scene', a) }),
      map(scenes => scenes.filter(sceneSingle => sceneSingle.slug === slug)[0]),
    )
  }

  saveScene(scene: Scene, update: boolean = false, slug = ''): Observable<Scene> {
    // check if scene exists
    if (update) {
      return this.apiService.putExpress(`/scene${slug}`, UtilsAdmin.convertToFormData(scene));
    } else {
      return this.apiService.postExpress('/scene', UtilsAdmin.convertToFormData(scene));
    }

  }

  deleteScene(id: string): Observable<Scene> {
    return this.apiService.deleteExpress(`/scene${id}`);
  }

}
