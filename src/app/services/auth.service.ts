import { Injectable, inject } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyB6Oz7MSiYK3t6xPBbS6xoe6x40yMKlOcQ',
  authDomain: 'expense-2d490.firebaseapp.com',
  databaseURL: 'https://expense-2d490.firebaseio.com',
  projectId: 'expense-2d490',
  storageBucket: 'expense-2d490.appspot.com',
  messagingSenderId: '768990566124',
  appId: '1:768990566124:web:d4fb8a098668edfcb5f7c9',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription!: Subscription;
  constructor(private router: Router) {
    const auth = getAuth(app);
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      if (aUser == null) {
        this.router.navigate([''])
        // this.loginWithIdPassword('sumedh225109@gmail.com', 'SumedhPass@062024');
      } else {
        this.router.navigate(['home']);
      }
    });
  }

  signOut(){
    this.auth.signOut();
    this.router.navigate(['']);
  }

  loginWithIdPassword(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  SignUpWithIdPassword(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}
