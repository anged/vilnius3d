import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockUIModule } from 'ng-block-ui';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';


@NgModule({
  declarations: [SafeUrlPipe],
  imports: [
    CommonModule,
    BlockUIModule.forRoot({
      delayStop: 3000
    })
  ],
  exports: [BlockUIModule, SafeUrlPipe]
})
export class SharedModule { }
