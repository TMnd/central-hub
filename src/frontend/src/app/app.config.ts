import {
    ApplicationConfig,
    inject,
    provideAppInitializer,
    provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideToastr} from 'ngx-toastr';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {I18nService} from './services/i18n.service';
import {AppInitService} from './services/app-init.service';
import {ApplicationConfigurations} from './services/application-configurations.service';

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideHttpClient(withInterceptorsFromDi()),
      provideAnimations(),
      provideToastr(),
      ApplicationConfigurations,
      I18nService,
      AppInitService,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
      },
      provideAppInitializer(() => {
          const appInitService = inject(AppInitService);
          appInitService.fetchApplicationConfiguration().then(() => {console.log("Configuration loaded.")});
          return appInitService.fetchI18nData().then(() => {console.log(`Dictionary "${navigator.language.toUpperCase()}" loaded.`)});
      }),
  ]
};
