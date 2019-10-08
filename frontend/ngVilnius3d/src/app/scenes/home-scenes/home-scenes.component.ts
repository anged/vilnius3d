import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { SwiperOptions } from 'swiper';
import { ResizedEvent } from 'angular-resize-event';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { Scene } from '../../models/scene.model';
import { ScenesService } from '../../services/scenes.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'v3d-home-scenes',
  templateUrl: './home-scenes.component.html',
  styleUrls: ['./home-scenes.component.scss']
})
export class HomeScenesComponent implements OnInit, AfterViewInit, OnDestroy {
  scenes$: Observable<Scene[]>;
  imgPath = environment.urlExpress;
  defaultImage = '/assets/img/default.jpg'
  config: SwiperOptions = {
    spaceBetween: 30,
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    pagination: {
      el: '.swiper-pagination',
    },
  };
  screenWidth: number;
  // BlockUI instance for directive
  @BlockUI('home__section') blockUI: NgBlockUI;

  constructor(private scenesService: ScenesService) {
    // Start UI blocking
    this.blockUI.start();
  }

  ngOnInit() {
    this.scenes$ = this.scenesService.getPublicScenes();
  }

  setBg(img: string): string {
    return this.imgPath + '/' + img;
  }

  setBgUrl(img: string): string {
    console.log(`url(${this.imgPath}/${img})`)
    return `url(${this.imgPath}/${img})`;
  }

  onResized(event: ResizedEvent) {
    this.screenWidth = event.newWidth;
  }

  ngAfterViewInit(): void {
    // Stop UI blocking
    setTimeout(() => {
      this.blockUI.stop();
    }, 50);
  }
  
  ngOnDestroy(): void {
    this.blockUI.stop();
    this.blockUI.unsubscribe();
  }

}
