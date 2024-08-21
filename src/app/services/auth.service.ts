import {
  EventEmitter,
  Injectable,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { Auth, GoogleAuthProvider, getRedirectResult } from '@angular/fire/auth';
import { Router } from '@angular/router';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
} from 'firebase/auth';
import { object } from '@angular/fire/database';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  _that = this;
  provider = new GoogleAuthProvider()

  constructor(private router: Router, private dataService: DataService) {    
    if (localStorage.getItem('user') != undefined){
      this.dataService.setLoader(true);
      
      this.dataService.setLoggedInUserData()
      
    } else {
      // this.router.navigate(['']);
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('user') != undefined ? true : false;
  }

  loginWithIdPassword(cred: { email: string; password: string }) {
    return signInWithEmailAndPassword(this.auth, cred.email, cred.password);
  }

  loginWithGoogle(){
    signInWithPopup(this.auth,this.provider)
    .then((result: { user: any; }) => {
      localStorage.setItem('user',JSON.stringify(result.user));
      this.dataService.setLoggedInUserData()
      this.router.navigate(['/home'])
    })
    .catch((error: any) => {
      console.error('Google Sign-In Error:', error);
    });
  }

  SignUpWithIdPassword(cred: { email: string; password: string, user_name: string }) {
    return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(this.auth, cred.email, cred.password)
      .then((userCredential) => {
        let user = { ...userCredential.user, ...{name: cred.user_name}};
        localStorage.setItem('user',JSON.stringify(user));
        this.dataService.setNewUserConfig(user)
        this.router.navigate(['/home']);
        resolve(userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(error);
      });
    })
  }


  // Logout
  signOut() {
    localStorage.removeItem('user')
    localStorage.clear();
    this.auth.signOut();
    setTimeout(() => {
      this.router.navigate(['']);
    }, 100);
  }

  
}
