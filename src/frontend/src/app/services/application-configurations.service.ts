import {Injectable, signal} from '@angular/core';

@Injectable()
export class ApplicationConfigurations {

    basicAuthenticationToken = signal<string>('');
    i18nDictionary = signal<Map<string, string>>(new Map<string, string>());

}
