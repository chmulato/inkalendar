import { Injectable } from '@angular/core';
import { 
  Auth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly auth: Auth;
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  readonly user$ = this.userSubject.asObservable();

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.auth = this.firebaseService.getAuth();
    
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
      if (!user && !window.location.pathname.includes('/login')) {
        this.router.navigate(['/login']);
      }
    });
  }

  async signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      await this.router.navigate(['/']);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }
}