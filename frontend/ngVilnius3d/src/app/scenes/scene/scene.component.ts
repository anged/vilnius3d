import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ScenesService } from 'src/app/services/scenes.service';
import { Observable } from 'rxjs';
import { Scene } from '../../models/scene.model';
import { switchMap, tap } from 'rxjs/operators';
import { ScenesRoutingService } from '../scenes-routing.service';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'v3d-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit, OnDestroy {
  scene$: Observable<Scene>;
  firstLoad = false; 
  currentSlug: string;
  futureSlug: string;

  // BlockUI instance for directive
  @BlockUI('iframe__section') blockUI: NgBlockUI;


  constructor(private route: ActivatedRoute, private scenesService: ScenesService, private scenesRoutingService: ScenesRoutingService) { }

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
      switchMap((params: ParamMap) => this.scenesService.getSceneBySlug(params.get('slug')))
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
