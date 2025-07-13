import {inject, Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {ApplicationConfigurations} from '../services/application-configurations.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private readonly applicationConfigurations = inject(ApplicationConfigurations);

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const tokenBasic = this.applicationConfigurations.basicAuthenticationToken();

        const cloned = req.clone({
            setHeaders: {
                Authorization: `Basic ${tokenBasic}`
            }
        });
        return next.handle(cloned);

    }
}
