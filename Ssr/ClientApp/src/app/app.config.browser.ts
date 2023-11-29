import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';

const browserConfig: ApplicationConfig = {
  providers: [
    { provide: 'MESSAGE', useValue: 'B' }
  ]
};

export const config = mergeApplicationConfig(appConfig, browserConfig);
