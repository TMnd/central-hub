import {Injectable, signal} from '@angular/core';
import { DictionaryType } from '../interfaces';

@Injectable()
export class ApplicationConfigurations {
    basicAuthenticationToken = signal<string>('');
    i18nDictionary = signal<DictionaryType[]>([]);
}
