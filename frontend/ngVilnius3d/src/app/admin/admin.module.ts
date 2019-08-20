import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdministrationComponent } from './administration/administration.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AdministrationComponent, HeaderComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
