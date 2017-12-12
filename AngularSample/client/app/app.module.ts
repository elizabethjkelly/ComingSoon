import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { APP_COMPONENTS } from '$/components';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    APP_COMPONENTS
  ],
  entryComponents: [],
  providers: [],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
