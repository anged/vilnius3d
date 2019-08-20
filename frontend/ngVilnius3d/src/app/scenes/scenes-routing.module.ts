import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScenesListComponent } from './scenes-list/scenes-list.component';
import { ScenesComponent } from './scenes.component';
import { SceneComponent } from './scene/scene.component';

const routes: Routes = [{
  path: '',
  component: ScenesComponent,
  children: [
    {
      path: ':slug',
      component: SceneComponent
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScenesRoutingModule { }
