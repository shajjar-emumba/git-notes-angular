import { FirebaseAuth } from './../../node_modules/@firebase/auth-types/index.d';
import { Auth, getAuth, provideAuth } from '@angular/fire/auth';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideStore(),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
};
