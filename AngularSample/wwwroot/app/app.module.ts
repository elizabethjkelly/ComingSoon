import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { APP_COMPONENTS } from '$/components';
import { APP_PROVIDERS } from '$/services';

import 'rxjs/Rx';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [AppComponent, APP_COMPONENTS],
  entryComponents: [],
  providers: [APP_PROVIDERS],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
