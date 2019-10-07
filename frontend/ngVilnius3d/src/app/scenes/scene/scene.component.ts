import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ScenesService } from 'src/app/services/scenes.service';
import { Observable, of } from 'rxjs';
import { Scene } from '../../models/scene.model';
import { switchMap, tap, map } from 'rxjs/operators';
import { ScenesRoutingService } from '../scenes-routing.service';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'v3d-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit, OnDestroy {
  // caching scenes from list because we only want to get single scene from the current list scenes
  // However when we routing to to other components we sending new get request
  // because new scene can be added or updated
  private scenesCache$: Observable<Scene[]>;
  scene$: Observable<Scene>;
  firstLoad = false; 
  currentSlug: string;
  futureSlug: string;

  // BlockUI instance for directive
  @BlockUI('iframe__section') blockUI: NgBlockUI;


  constructor(private route: ActivatedRoute, private router: Router, private scenesService: ScenesService, private scenesRoutingService: ScenesRoutingService) { }

  ngOnInit() {
    this.scene$ = this.route.paramMap.pipe(
      tap((params: ParamMap) => {        
        if (this.blockUI.isActive) {
          this.blockUI.stop();
        }
        // Start UI blocking
        this.blockUI.start();

        this.scenesRoutingService.setCurrentSlug(params.get('slug'))
      }),
      // not using getSceneBySlug
      // switchMap((params: ParamMap) => this.scenesService.getSceneBySlug(params.get('slug'))),
      switchMap((params: ParamMap) => {
        if (this.scenesCache$) {
          return this.getScene(this.scenesCache$, params);
        }
        this.scenesCache$ = this.scenesService.getScenes()
        return this.getScene(this.scenesCache$, params);
      }),
      tap((scene: Scene) => {
        if (!scene) this.router.navigateByUrl('/')
      })
    );

  }

  getScene(scenes$: Observable<Scene[]>, params: ParamMap):  Observable<Scene> {
    return scenes$.pipe(
      map((scenes: Scene[]) => scenes.filter(scene => scene.slug === params.get('slug'))[0])
    );
  }

  resizeIframe(frame: HTMLIFrameElement) {
    // Stop UI blocking
    this.blockUI.stop();

  }

  ngOnDestroy(): void {
    this.blockUI.stop();
    this.blockUI.unsubscribe();
  }

}
