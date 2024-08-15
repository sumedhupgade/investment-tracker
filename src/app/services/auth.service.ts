import {
  EventEmitter,
  Injectable,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
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
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  _that = this;
 

  constructor(private router: Router, private dataService: DataService) {    
    if (localStorage.getItem('user') != undefined){
      this.dataService.setLoader(true);
      
      this.dataService.setLoggedInUserData()
      
    } else {
      this.router.navigate(['']);
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != undefined ? true : false;
  }

  loginWithIdPassword(cred: { email: string; password: string }) {
    return signInWithEmailAndPassword(this.auth, cred.email, cred.password);
  }

  SignUpWithIdPassword(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }


  // Logout
  signOut() {
    localStorage.removeItem('user')
    localStorage.clear();
    this.auth.signOut();
    this.router.navigate(['']);
  }

  
}
