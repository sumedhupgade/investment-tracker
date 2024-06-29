import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'expense-2d490',
        appId: '1:768990566124:web:d4fb8a098668edfcb5f7c9',
        databaseURL: 'https://expense-2d490.firebaseio.com',
        storageBucket: 'expense-2d490.appspot.com',
        // locationId: 'us-central',
        apiKey: 'AIzaSyB6Oz7MSiYK3t6xPBbS6xoe6x40yMKlOcQ',
        authDomain: 'expense-2d490.firebaseapp.com',
        messagingSenderId: '768990566124',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule,FormsModule])
  ],
};
