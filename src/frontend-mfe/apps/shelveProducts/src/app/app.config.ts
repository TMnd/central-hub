import {
    ApplicationConfig, inject, provideAppInitializer,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection,
} from '@angular/core';
import {provideRouter} from '@angular/router';
import {appRoutes} from './app.routes';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {ApplicationConfigurations} from "./services/application-configurations.service";
import {I18nService} from "./services/i18n.service";
import {AppInitService} from "./services/app-init.service";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(appRoutes),
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
            appInitService.fetchApplicationConfiguration().then(() => {
                console.log("Configuration loaded.")
            });
            return appInitService.fetchI18nData().then(() => {
                console.log(`Dictionary "${navigator.language.toUpperCase()}" loaded.`)
            });
        }),
    ]
}
