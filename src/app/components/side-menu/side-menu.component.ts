import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="menu-container" [class.open]="isOpen">
      <button class="menu-toggle" (click)="toggleMenu()">
        <span class="menu-icon"></span>
      </button>
      
      <nav class="menu-items">
        <h3>Menu</h3>
        <ul>
          <li><button (click)="navigate('appointments')">Lista de Agendamentos</button></li>
          <li><button (click)="navigate('monthly-report')">Relatório Mensal</button></li>
          <li><button (click)="navigate('annual-report')">Relatório Anual</button></li>
        </ul>
      </nav>
    </div>
  `,
  styles: [`
    .menu-container {
      position: fixed;
      top: 0;
      left: 0;
      height: 100vh;
      background: #fff;
      box-shadow: 2px 0 5px rgba(0,0,0,0.1);
      transform: translateX(-250px);
      transition: transform 0.3s ease;
      z-index: 1000;
    }

    .menu-container.open {
      transform: translateX(0);
    }

    .menu-toggle {
      position: absolute;
      right: -50px;
      top: 20px;
      background: #fff;
      border: none;
      padding: 10px;
      cursor: pointer;
      border-radius: 0 4px 4px 0;
      box-shadow: 2px 0 5px rgba(0,0,0,0.1);
    }

    .menu-icon {
      display: block;
      width: 25px;
      height: 3px;
      background: #333;
      position: relative;
    }

    .menu-icon::before,
    .menu-icon::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 3px;
      background: #333;
      left: 0;
    }

    .menu-icon::before {
      top: -8px;
    }

    .menu-icon::after {
      bottom: -8px;
    }

    .menu-items {
      width: 250px;
      padding: 20px;
    }

    .menu-items h3 {
      margin-bottom: 20px;
      color: #333;
    }

    .menu-items ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .menu-items li {
      margin-bottom: 10px;
    }

    .menu-items button {
      width: 100%;
      padding: 10px;
      text-align: left;
      background: none;
      border: none;
      cursor: pointer;
      color: #333;
      transition: background-color 0.2s;
      border-radius: 4px;
    }

    .menu-items button:hover {
      background-color: #f0f0f0;
    }
  `]
})
export class SideMenuComponent {
  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  navigate(route: string) {
    console.log(`Navegando para: ${route}`);
    // Aqui será implementada a navegação quando adicionarmos o router
  }
}