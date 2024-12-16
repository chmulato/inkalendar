import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { AuthService } from './core/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SideMenuComponent],
  template: `
    <app-side-menu *ngIf="isLoggedIn$ | async"></app-side-menu>
    <div class="app-container" [class.with-menu]="isLoggedIn$ | async">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
    .app-container {
      padding: 20px;
      transition: margin-left 0.3s ease;
    }

    .with-menu {
      margin-left: 60px;
    }
  `,
  ],
})
export class AppComponent {
  isLoggedIn$ = this.auth.user$;

  constructor(private auth: AuthService) {}
}
