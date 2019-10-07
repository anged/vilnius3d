import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BlockUIModule } from 'ng-block-ui';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';

// import {BreadcrumbModule} from 'xng-breadcrumb';
import {BreadcrumbModule} from 'angular-crumbs';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './footer.component';

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
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  exports: [CommonModule, BlockUIModule, SafeUrlPipe, BreadcrumbModule, BrowserAnimationsModule, ToastrModule, FooterComponent]
})
export class SharedModule { }
