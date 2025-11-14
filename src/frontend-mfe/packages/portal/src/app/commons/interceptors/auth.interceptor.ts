import {inject, Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationConfigurations } from '@portal/library';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const applicationConfigurations = inject(ApplicationConfigurations);
        const tokenBasic = applicationConfigurations.basicAuthenticationToken();

        const cloned = req.clone({
            setHeaders: {
                Authorization: `Basic ${tokenBasic}`
            }
        });
        return next.handle(cloned);

    }
}
