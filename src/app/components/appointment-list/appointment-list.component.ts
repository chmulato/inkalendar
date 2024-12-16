import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '../../models/appointment';

@Component({
  selector: 'app-appointment-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="appointments-container">
      <h2>Lista de Agendamentos</h2>
      <div class="appointments-list">
        @for (appointment of appointments; track appointment.id) {
          <div class="appointment-card">
            <h3>{{ appointment.clientName }}</h3>
            <p><strong>Data:</strong> {{ appointment.date }}</p>
            <p><strong>Hora:</strong> {{ appointment.time }}</p>
            <p><strong>Valor:</strong> R$ {{ appointment.price }}</p>
            <p><strong>Local:</strong> {{ appointment.tattooLocation }}</p>
            <p><strong>Status:</strong> 
              <span [class.paid]="appointment.depositPaid">
                {{ appointment.depositPaid ? 'Taxa Paga' : 'Taxa Pendente' }}
              </span>
            </p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .appointments-container {
      padding: 20px;
    }

    .appointments-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .appointment-card {
      background: white;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .appointment-card h3 {
      margin-top: 0;
      color: #2c3e50;
    }

    .paid {
      color: #27ae60;
    }
  `]
})
export class AppointmentListComponent {
  appointments: Appointment[] = [
    // Dados de exemplo
    {
      id: 1,
      clientName: 'João Silva',
      date: '2024-01-20',
      time: '14:00',
      price: 350,
      tattooLocation: 'Braço Direito',
      tattooDesign: 'Tribal',
      depositPaid: true
    },
    // Adicione mais dados de exemplo conforme necessário
  ];
}