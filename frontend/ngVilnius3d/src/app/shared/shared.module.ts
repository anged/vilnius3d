import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockUIModule } from 'ng-block-ui';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';

// import {BreadcrumbModule} from 'xng-breadcrumb';
import {BreadcrumbModule} from 'angular-crumbs';

@NgModule({
  declarations: [
    SafeUrlPipe,
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    BlockUIModule.forRoot({
      delayStop: 3000
    })
  ],
  exports: [CommonModule, BlockUIModule, SafeUrlPipe, BreadcrumbModule]
})
export class SharedModule { }
