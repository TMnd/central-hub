import { HttpClient } from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import { I18nService } from "./i18n.service";
import {firstValueFrom, map, shareReplay} from "rxjs";
import {ApplicationConfigurations} from './application-configurations.service';

type MapEntry = {
    [key: string]: string;
};

@Injectable()
export class AppInitService {

    private readonly i18nService = inject(I18nService);
    private readonly httpClient = inject(HttpClient);
    private readonly applicationConfigurations = inject(ApplicationConfigurations);

    private checkLanguage(language: string): string {
        return language === 'pt' || language === 'en' ? language : 'en';
    }

    private getLanguageDic(language: string) {
        return firstValueFrom(this.httpClient.get<MapEntry>(`assets/i18n/messages-${language}.json`).pipe(shareReplay(1)));
    }

    private getApplicationConfiguration() {
        return firstValueFrom(this.httpClient.get<MapEntry>(`assets/shelve-products.config.json`).pipe(shareReplay(1)));
    }

    async fetchI18nData() {
        const language = this.checkLanguage(navigator.language);
        const data = await this.getLanguageDic(language);
        const tempMap = new Map<string, string>;
        Object.keys(data).forEach(key => {
            tempMap.set(key, data[key]);
        });
        this.i18nService.addMap(tempMap);
    }

    async fetchApplicationConfiguration() {
        const applicationConfiguration = await this.getApplicationConfiguration();

        let applicationConfigurationAuthPass = btoa(applicationConfiguration["bff.auth.pass"]);

        this.applicationConfigurations.basicAuthenticationToken.set(applicationConfigurationAuthPass);
    }

}
