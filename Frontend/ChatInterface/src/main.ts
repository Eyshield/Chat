import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
if (typeof (window as any).global === 'undefined') {
  (window as any).global = window;
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
