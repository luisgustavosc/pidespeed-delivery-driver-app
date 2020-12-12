import './polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as Sentry from '@sentry/angular';
import { Integrations } from '@sentry/tracing';
import 'hammerjs';


//  Sentry.init({
//    dsn: 'https:380b46a466b2483c969b1b9cc387002b@o440665.ingest.sentry.io/5410238',
//    integrations: [
//      new Integrations.BrowserTracing({
//        tracingOrigins: ['localhost', 'https:empresas.pidespeed.com'],
//        routingInstrumentation: Sentry.routingInstrumentation,
//      }),
//    ],
//    tracesSampleRate: 1.0,
//  });

 platformBrowserDynamic()
   .bootstrapModule(AppModule)
   .then(ref => {
     // Ensure Angular destroys itself on hot reloads.
     if (window['ngRef']) {
       window['ngRef'].destroy();
     }
     window['ngRef'] = ref;

    //  Otherwise, log the boot error
   })
   .catch(err => console.error(err));
