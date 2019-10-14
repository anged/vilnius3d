import { NgModule } from '@angular/core';

import { ScenesRoutingModule } from './scenes-routing.module';
import { ScenesListComponent } from './scenes-list/scenes-list.component';
import { ScenesComponent } from './scenes.component';
import { SceneComponent } from './scene/scene.component';
import { HeaderComponent } from '../header.component';
import { SharedModule } from '../shared/shared.module';
import { HomeScenesComponent } from './home-scenes/home-scenes.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { AngularResizedEventModule } from 'angular-resize-event';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [ HeaderComponent, ScenesListComponent, ScenesComponent, SceneComponent, HomeScenesComponent],
  providers: [ CookieService ],
  imports: [
    ScenesRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    SharedModule,
    LazyLoadImageModule,
    NgxUsefulSwiperModule,
    AngularResizedEventModule,
    DeviceDetectorModule.forRoot()
  ]
})
export class ScenesModule { }
