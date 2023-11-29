import 'zone.js/node';
import 'reflect-metadata';
import { provideServerRendering, renderApplication } from '@angular/platform-server';
import { enableProdMode, StaticProvider } from '@angular/core';
import { createServerRenderer } from 'aspnet-prerendering';
//import { AppServerModule } from './app/app.server.module';
import { DATA_FROM_SERVER } from './app/providers/data-from-server';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { config as serverConfig } from './app/app.config.server';
//export { AppServerModule } from './app/app.server.module';

enableProdMode();

export default createServerRenderer(params => {
  const providers: StaticProvider[] = [
    { provide: DATA_FROM_SERVER, useValue: params.data },
  ];

  const options = {
    document: params.data.originalHtml,
    url: params.url,
    platformProviders: providers
  };

  // Bypass ssr api call cert warnings in development
  process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = "0";

  //const renderPromise = renderModule(AppServerModule, options);
  const renderPromise = renderApplication(() => bootstrapApplication(AppComponent, serverConfig), options);

  return renderPromise.then(html => ({ html }));
});
