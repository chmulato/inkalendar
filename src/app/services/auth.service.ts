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
  private auth: Auth;
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.auth = this.firebaseService.getAuth();
    
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  async signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Erro ao fazer login com Google:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  }

  isAuthenticated(): Observable<boolean> {
    return new Observable((subscriber) => {
      onAuthStateChanged(this.auth, (user) => {
        subscriber.next(!!user);
        subscriber.complete();
      });
    });
  }
}