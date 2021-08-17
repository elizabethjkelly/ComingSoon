import 'zone.js';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app';

const modulePromise = platformBrowserDynamic().bootstrapModule(AppModule);
