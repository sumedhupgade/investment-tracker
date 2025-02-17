import {
  EventEmitter,
  Injectable,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import { collection, getDocs, getFirestore, query, updateDoc } from 'firebase/firestore';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { object } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription!: Subscription;
  userInfo: any;
  currentUser = signal({});
  userData = signal({} || object<any>);
  readonly userDetails = this.currentUser.asReadonly();
  db = getFirestore();
  loading: Array<boolean> = [];
  loadingStart = new EventEmitter();

  constructor(private router: Router) {}

  setLoggedInUserData() {
    this.user$.subscribe((aUser: User | null) => {
      this.setLoader(false);
      if (aUser != null) {
        this.userInfo = aUser;
        this.checkIfUserIdExist(aUser);
        this.currentUser.set(this.userInfo);
        localStorage.setItem('user', JSON.stringify(aUser));
      }
      
      if (this.router.url == '/' || this.router.url == '/signup' || this.router.url == '/reset-password') {
        this.router.navigate(['/home']);
      }
    });
  }

  async checkIfUserIdExist(user: any) {
    this.setLoader(true);
    const docRef = doc(this.db, 'users', user.uid);
    const docSnap = getDoc(docRef);

    if ((await docSnap).exists()) {
      const unsub = onSnapshot(doc(this.db, 'users', user.uid), (doc) => {
        this.userData.set(doc.data());
        this.setLoader(false);
      });
    } else {
      this.setLoader(false);
      this.setNewUserConfig(this.userInfo);
    }
  }

  setNewUserConfig(user: any) {
    this.setLoader(true);
    const year = new Date().getFullYear();
    setDoc(doc(this.db, 'users', user?.uid), {
      user_info: {
        email: user?.email,
        name: user?.displayName == undefined ? user.name : user?.displayName,
        img: 'https://ui-avatars.com/api/?name='+ (user?.displayName == undefined ? user.name : user?.displayName) +'&rounded=true'
      },
      todo: [],
      monthly_expenses: {
        '2024-01': [],
      },
      investments: {
        '2024': {
          total: 0,
          mf: { total: 0, list: [] },
          stocks: { total: 0, list: [] },
          nps: { total: 0, list: [] },
          fd: { total: 0, list: [] },
        },
      },
    });
    this.setLoader(false);
  }

  async updateData(data: object) {
    const docRef = doc(this.db, 'users', this.userInfo.uid);
    await updateDoc(docRef,data)
  }

  getUserName(){
    return this.userInfo.name;
  }

  
  setLoader(state: boolean) {
    if (state) {
      this.loading.push(true);
    } else {
      this.loading.pop();
    }
    this.loadingStart.emit(this.loading);
  }
}
