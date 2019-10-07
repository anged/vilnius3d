import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdministrationComponent } from './administration/administration.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ScenesComponent } from './scenes/scenes.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { SceneEditorComponent } from './scene-editor/scene-editor.component';
import { SharedModule } from '../shared/shared.module';

import { HelpComponent } from './dashboard/help.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { EmailValidatorDirective } from './user-editor/email-validator.directive';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule }   from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  declarations: [
    AdministrationComponent,
    HeaderComponent,
    DashboardComponent,
    SidebarComponent,
    ScenesComponent,
    UsersComponent,
    ProfileComponent,
    SceneEditorComponent,
    HelpComponent,
    UserEditorComponent,
    EmailValidatorDirective
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ]
})
export class AdminModule { }
