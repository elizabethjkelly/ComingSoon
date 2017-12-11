import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { APP_COMPONENTS } from '$/components';
import { APP_PROVIDERS } from '$/services';

import 'hammerjs/hammer';
import 'rxjs/add/operator/map';

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
  providers: [
    APP_PROVIDERS
  ],
  exports: [],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
