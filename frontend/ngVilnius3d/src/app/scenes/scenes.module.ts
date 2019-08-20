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

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ HeaderComponent, ScenesListComponent, ScenesComponent, SceneComponent],
  imports: [
    ScenesRoutingModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    SharedModule
  ]
})
export class ScenesModule { }
