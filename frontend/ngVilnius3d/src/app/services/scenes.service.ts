import { Injectable } from '@angular/core';

import { Scene } from '../models/scene.model';

import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { shareReplay, map, tap } from 'rxjs/operators';


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
}
