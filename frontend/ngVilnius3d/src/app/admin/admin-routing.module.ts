import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministrationComponent } from './administration/administration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { ScenesComponent } from './scenes/scenes.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { SceneEditorComponent } from './scene-editor/scene-editor.component';
import { UserEditorComponent } from './user-editor/user-editor.component';

const routes: Routes = [
  {
    path: 'admin',
    pathMatch: 'full',
    redirectTo: '/admin/dashboard/scenes'
  }, {
    path: 'admin',
    component: AdministrationComponent,
    children: [
      {
        path: 'dashboard',
        pathMatch: 'full',
        redirectTo: '/admin/dashboard/scenes'
      },  {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [IsAuthenticatedGuard],
        data: { breadcrumb: 'Valdymo skydelis'},
        children: [
          {
            path: 'scenes',
            component: ScenesComponent,
            canActivate: [IsAuthenticatedGuard],
            data: { breadcrumb: 'Scenos' }
          }, {
            path: 'scenes',
            data: { breadcrumb: 'Scenos' },
            children: [
              {
                path: ':slug',
                component: SceneEditorComponent,
                canActivate: [IsAuthenticatedGuard],
                data: { breadcrumb: 'Scena' },
              }
            ]
          }, {
            path: 'new-scene',
            component: SceneEditorComponent,
            canActivate: [IsAuthenticatedGuard],
            data: { breadcrumb: 'Nauja scena' }
          }, {
            path: 'users',
            component: UsersComponent,
            canActivate: [IsAuthenticatedGuard],
            data: { breadcrumb: 'Vartotojai' }
          }, {
            path: 'new-user',
            component: UserEditorComponent,
            canActivate: [IsAuthenticatedGuard],
            data: { breadcrumb: 'Naujas Vartotojas' }
          }, {
            path: 'profile',
            component: ProfileComponent,
            canActivate: [IsAuthenticatedGuard],
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
