import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { FEATURES } from './components/angular-signal/angular-signal';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: FEATURES, useValue: 'search', multi: true },
    { provide: FEATURES, useValue: 'share', multi: true },
    { provide: FEATURES, useValue: 'ai', multi: true }
  ]
};
