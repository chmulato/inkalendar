import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>InKalendar</h1>
        <p>Sistema de Agendamento de Tatuagem</p>
        
        <button 
          class="google-btn" 
          (click)="signInWithGoogle()"
          [disabled]="isLoading"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google Logo" />
          {{ isLoading ? 'Entrando...' : 'Entrar com Google' }}
        </button>

        @if (errorMessage) {
          <div class="error-message">
            {{ errorMessage }}
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .login-card {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      max-width: 400px;
      width: 90%;
    }

    h1 {
      color: #2d3748;
      margin-bottom: 0.5rem;
      font-size: 2rem;
    }

    p {
      color: #718096;
      margin-bottom: 2rem;
    }

    .google-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: white;
      border: 1px solid #e2e8f0;
      padding: 0.75rem 1.5rem;
      border-radius: 5px;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
      font-size: 1rem;
    }

    .google-btn:not(:disabled):hover {
      background: #f7fafc;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .google-btn:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .google-btn img {
      width: 20px;
      height: 20px;
    }

    .error-message {
      margin-top: 1rem;
      color: #e53e3e;
      font-size: 0.875rem;
    }
  `]
})
export class LoginComponent {
  isLoading = false;
  errorMessage = '';

  constructor(private auth: AuthService) {}

  async signInWithGoogle(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';

    try {
      await this.auth.signInWithGoogle();
    } catch (error) {
      this.errorMessage = 'Erro ao fazer login. Por favor, tente novamente.';
      console.error('Erro no login:', error);
    } finally {
      this.isLoading = false;
    }
  }
}