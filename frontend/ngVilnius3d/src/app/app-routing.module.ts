import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeScenesComponent } from './scenes/home-scenes/home-scenes.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeScenesComponent,
  //   pathMatch: 'full'
  // }
  // {
  //   path: 'scenos',
  //   pathMatch: 'full',
  //   redirectTo: ''
  // },  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
