import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScenesModule } from './scenes/scenes.module';

import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth/auth.module';
import { Vilnius3dHttpInterceptor } from './interceptors/vilnius3d-http-interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ScenesModule,
    AppRoutingModule,
    SharedModule,
    AdminModule,
    AuthModule
    
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: Vilnius3dHttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
