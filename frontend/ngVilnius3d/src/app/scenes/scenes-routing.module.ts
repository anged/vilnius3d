import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SceneComponent } from './scene/scene.component';
import { HomeScenesComponent } from './home-scenes/home-scenes.component';
import { ScenesComponent } from './scenes.component';

const routes: Routes = [
  {
    path: '',
    component: HomeScenesComponent,
    pathMatch: 'full'
  }, {
    path: '',
    children: [
      {
        path: '',
        component: ScenesComponent,
        children: [
          {
            path: 'scenos/:slug',
            component: SceneComponent,
            pathMatch: 'full'
          },
        ]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScenesRoutingModule { }
