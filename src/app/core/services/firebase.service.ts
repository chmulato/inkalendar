import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { firebaseConfig } from '../config/firebase.config';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private readonly app = initializeApp(firebaseConfig);
  private readonly auth: Auth = getAuth(this.app);
  private readonly firestore: Firestore = getFirestore(this.app);

  getAuth(): Auth {
    return this.auth;
  }

  getFirestore(): Firestore {
    return this.firestore;
  }
}