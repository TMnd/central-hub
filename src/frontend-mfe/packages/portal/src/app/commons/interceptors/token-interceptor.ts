import {HttpHandlerFn, HttpRequest} from "@angular/common/http";
import { inject } from '@angular/core';
import { ApplicationConfigurations } from '@portal/library';

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const applicationConfigurations = inject(ApplicationConfigurations);

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${applicationConfigurations.basicAuthenticationToken()}`
      }
    });

    return next(authReq);
}
