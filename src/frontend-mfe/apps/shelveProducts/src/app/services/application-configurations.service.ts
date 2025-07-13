import {Injectable, signal} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApplicationConfigurations {

    basicAuthenticationToken = signal<string>('');
    i18nDictionary = signal<Map<string, string>>(new Map<string, string>());

}
