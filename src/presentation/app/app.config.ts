import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, RouteReuseStrategy, withComponentInputBinding } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { provideUtils } from '@utils/utils.provider';
import { provideInterceptors } from '@interceptors/interceptors.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(APP_ROUTES, withComponentInputBinding()),
    provideUtils(),
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    importProvidersFrom(IonicModule.forRoot()),
    provideInterceptors(),
  ],
};
