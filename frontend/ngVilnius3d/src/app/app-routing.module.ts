import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './scenes/scenes.module#ScenesModule' },
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
  { path: 'login', loadChildren: './auth/auth/auth.module#AuthModule' },
  {
        path: '**',
        redirectTo: ''
      }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
