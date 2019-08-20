import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScenesModule } from './scenes/scenes.module';

import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth/auth.module';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
