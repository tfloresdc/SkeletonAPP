import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs, 'es');

platformBrowserDynamic([
  { provide: LOCALE_ID, useValue: 'es' }
]).bootstrapModule(AppModule)
  .catch(err => console.error(err));