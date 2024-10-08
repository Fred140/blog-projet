import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() =>
    initializeApp({"projectId":"ang-blog-19e44","appId":"1:961330352047:web:f512d1fe40df07919f295a",
      "storageBucket":"ang-blog-19e44.appspot.com","apiKey":"AIzaSyDCEa8LxutBlrplQa76FeZPoZAodpG9oAc",
      "authDomain":"ang-blog-19e44.firebaseapp.com","messagingSenderId":"961330352047"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
