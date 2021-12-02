import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app.component';
import { COMPONENTS } from './components';
import { SERVICES } from './services';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  declarations: [COMPONENTS],
  providers: [SERVICES],
  bootstrap: [AppComponent],
})
export class CoreModule { }
