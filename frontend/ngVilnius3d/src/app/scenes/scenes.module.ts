import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScenesRoutingModule } from './scenes-routing.module';
import { ScenesListComponent } from './scenes-list/scenes-list.component';
import { ScenesComponent } from './scenes.component';
import { SceneComponent } from './scene/scene.component';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';
import { HeaderComponent } from '../header.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { LazyLoadImageModule } from 'ng-lazyload-image'; // <-- import it

import { SharedModule } from '../shared/shared.module';
import { HomeScenesComponent } from './home-scenes/home-scenes.component';

@NgModule({
  declarations: [ HeaderComponent, ScenesListComponent, ScenesComponent, SceneComponent, HomeScenesComponent],
  imports: [
    ScenesRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    SharedModule,
    LazyLoadImageModule
  ]
})
export class ScenesModule { }
