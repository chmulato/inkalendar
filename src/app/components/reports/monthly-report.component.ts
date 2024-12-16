import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-monthly-report',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="report-container">
      <h2>Relatório Mensal</h2>
      <div class="report-content">
        <div class="report-card">
          <h3>Total de Agendamentos</h3>
          <p class="number">25</p>
        </div>
        <div class="report-card">
          <h3>Faturamento Total</h3>
          <p class="number">R$ 8.750,00</p>
        </div>
        <div class="report-card">
          <h3>Taxa de Conclusão</h3>
          <p class="number">92%</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .report-container {
      padding: 20px;
    }

    .report-content {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .report-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }

    .number {
      font-size: 24px;
      font-weight: bold;
      color: #2c3e50;
      margin: 10px 0;
    }
  `]
})
export class MonthlyReportComponent {}