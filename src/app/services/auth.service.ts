import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB6Oz7MSiYK3t6xPBbS6xoe6x40yMKlOcQ",
  authDomain: "expense-2d490.firebaseapp.com",
  databaseURL: "https://expense-2d490.firebaseio.com",
  projectId: "expense-2d490",
  storageBucket: "expense-2d490.appspot.com",
  messagingSenderId: "768990566124",
  appId: "1:768990566124:web:d4fb8a098668edfcb5f7c9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { 
    console.log(db);
    
  }
}
