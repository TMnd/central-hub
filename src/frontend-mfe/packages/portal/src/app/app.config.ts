import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideHttpClient, withInterceptors,
  withInterceptorsFromDi
} from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import config from '../../module-federation.config';
import { AppInitService, ApplicationConfigurations } from '@portal/library';
import { tokenInterceptor } from './commons/interceptors/token-interceptor';
import { httpErrorInterceptor } from './commons/interceptors/httperror-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([tokenInterceptor, httpErrorInterceptor])
    ),
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    AppInitService,
    ApplicationConfigurations,
    provideAppInitializer(() => {
      const appInitService = inject(AppInitService);
      const remotes = (config.remotes as Array<string>) ?? [];
      appInitService.fetchApplicationConfiguration();
      if (remotes.length > 0) {
        for (const remote of remotes) {
          console.log(`Fetching i18n data for remote: ${remote}`);
          appInitService.fetchI18nData(remote);
        }
      } else {
        console.error("Remotes not found in module-federation.config.ts");
      }
    }),
  ],
};
