import { mergeApplicationConfig, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { appConfig } from './app.config';

import * as translationEn from '../assets/i18n/en.json';
import * as translationNl from '../assets/i18n/nl.json';

class TranslateJsonLoader implements TranslateLoader {
  public getTranslation(lang: string) {
    switch (lang) {
      case 'nl': return of(translationNl);
      default: return of(translationEn);
    }
  }
}

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: () => {
            return new TranslateJsonLoader();
          }
        }
      })
    )
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
