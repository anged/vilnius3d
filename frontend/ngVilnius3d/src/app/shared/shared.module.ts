import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlockUIModule } from 'ng-block-ui';
import { SafeUrlPipe } from '../pipes/safe-url.pipe';

import { FooterComponent } from './footer.component';

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
    BlockUIModule.forRoot({
      delayStop: 3000
    }),
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    AlertModule.forRoot()
  ],
  exports: [CommonModule, BlockUIModule, SafeUrlPipe, FooterComponent]
})
export class SharedModule { }
