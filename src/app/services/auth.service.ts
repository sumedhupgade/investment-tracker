import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription, single } from 'rxjs';
import { Router } from '@angular/router';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { object } from '@angular/fire/database';
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
const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription!: Subscription;
  userInfo: any;
  currentUser = signal({});
  userData = signal({} || object<any>)
  readonly userDetails = this.currentUser.asReadonly()

  constructor(private router: Router) {
    const auth = getAuth(app);
    this.userSubscription = this.user$.subscribe((aUser: User | null) => {
      if (aUser == null) {
        this.router.navigate(['']);
      } else {
        this.router.navigate(['home']);
        this.userInfo = aUser;
        this.checkIfUserIdExist(aUser);
        this.currentUser.set(this.userInfo);
      }
    });
  }

  loginWithIdPassword(cred: { email: string; password: string }) {
    return signInWithEmailAndPassword(this.auth, cred.email, cred.password);
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

  async checkIfUserIdExist(user: any) {
    const docRef = doc(db, 'users', this.userInfo.uid);
    const docSnap = getDoc(docRef);

    if ((await docSnap).exists()) {
      // console.log('Document data:', (await docSnap).data());
      this.getUserData();
    } else {
      this.setNewUserConfig();
    }
  }
  	
  finalUser = computed( ()=>{
    this.currentUser()
  })

  getUserData() {
    const unsub = onSnapshot(doc(db, 'users', this.userInfo.uid), (doc) => {
      this.userData.set(doc.data())
    });
  }

  setNewUserConfig() {
    setDoc(doc(db, 'users', this.userInfo.uid), {
      mail: this.userInfo.email,
      name: this.userInfo.name,
      investments: {
        2024: {
          mf: [],
          stocks: [],
          ppf: [],
          fd: [],
        },
      },
    });
  }

  signOut() {
    this.auth.signOut();
    this.router.navigate(['']);
  }
}
