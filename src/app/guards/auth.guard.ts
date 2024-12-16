import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  Router, 
  UrlTree 
} from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.auth.user$.pipe(
      take(1),
      map(user => {
        if (user) {
          return true;
        }
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}