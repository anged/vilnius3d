import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { ScenesComponent } from './scenes/scenes.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { SceneEditorComponent } from './scene-editor/scene-editor.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdministrationComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [IsAuthenticatedGuard],
        data: { breadcrumb: 'Valdymo skydelis'},
        children: [
          {
            path: 'scenes',
            component: ScenesComponent,
            data: { breadcrumb: 'Scenos' }
          }, {
            path: 'scenes',
            data: { breadcrumb: 'Scenos' },
            children: [
              {
                path: ':slug',
                component: SceneEditorComponent,
                data: { breadcrumb: 'Scena' },
              }
            ]
          }, {
            path: 'new-scene',
            data: { breadcrumb: 'Nauja scena' },
            component: SceneEditorComponent
          }, {
            path: 'users',
            component: UsersComponent,
            data: { breadcrumb: 'Vartotojai' }
          }, {
            path: 'profile',
            component: ProfileComponent,
            data: { breadcrumb: 'Vartotojo profilis' }
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
