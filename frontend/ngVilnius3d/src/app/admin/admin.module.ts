import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdministrationComponent } from './administration/administration.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ScenesComponent } from './scenes/scenes.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [AdministrationComponent, HeaderComponent, DashboardComponent, SidebarComponent, ScenesComponent, UsersComponent, ProfileComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    BsDropdownModule.forRoot()
  ]
})
export class AdminModule { }
