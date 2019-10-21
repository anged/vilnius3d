import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { IsNotAuthenticatedGuard } from './is-not-authenticated.guard';


const routes: Routes = [
  { 
    path: '', 
    component: AuthComponent,
    canActivate: [IsNotAuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
