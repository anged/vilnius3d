import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockUIModule } from 'ng-block-ui';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';

import {BreadcrumbModule} from 'angular-crumbs';
import { FooterComponent } from './footer.component';
import { CookieService } from 'ngx-cookie-service';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    SafeUrlPipe,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    BlockUIModule.forRoot({
      delayStop: 3000
    }),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  providers: [ CookieService ],
  exports: [CommonModule, BlockUIModule, SafeUrlPipe, BreadcrumbModule, FooterComponent]
})
export class SharedModule { }
