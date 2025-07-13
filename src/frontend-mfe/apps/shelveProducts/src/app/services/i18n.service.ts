import {inject, Injectable} from "@angular/core";
import {ApplicationConfigurations} from './application-configurations.service';

@Injectable()
export class I18nService {

    private readonly applicationConfigurations = inject(ApplicationConfigurations);

    private readonly i18n = this.applicationConfigurations.i18nDictionary;

    constructor() {
    }

    addMap(dictionary: Map<string, string>) {
        this.i18n.set(dictionary);
    }

    translate(value: string, arg?: string): string {
        if(arg) {
            let translate = this.i18n().get(value) ?? value;
            return translate.replace('%s', arg ?? '');
        }
        return this.i18n().get(value) ?? value;
    }

}
