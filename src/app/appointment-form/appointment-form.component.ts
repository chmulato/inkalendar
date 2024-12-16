import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Appointment } from '../models/appointment';

@Component({
  selector: 'app-appointment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="container">
      <h2>Agendar Tatuagem</h2>
      <form (ngSubmit)="onSubmit()" #form="ngForm" class="appointment-form">
        <div class="form-group">
          <label for="clientName">Nome do Cliente:</label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            [(ngModel)]="appointment.clientName"
            required
            class="form-control"
          >
        </div>

        <div class="form-group">
          <label for="date">Data:</label>
          <input
            type="date"
            id="date"
            name="date"
            [(ngModel)]="appointment.date"
            required
            class="form-control"
          >
        </div>

        <div class="form-group">
          <label for="time">Hora:</label>
          <input
            type="time"
            id="time"
            name="time"
            [(ngModel)]="appointment.time"
            required
            class="form-control"
          >
        </div>

        <div class="form-group">
          <label for="price">Valor:</label>
          <input
            type="number"
            id="price"
            name="price"
            [(ngModel)]="appointment.price"
            required
            class="form-control"
          >
        </div>

        <div class="form-group">
          <label for="tattooLocation">Local da Tatuagem:</label>
          <input
            type="text"
            id="tattooLocation"
            name="tattooLocation"
            [(ngModel)]="appointment.tattooLocation"
            required
            class="form-control"
          >
        </div>

        <div class="form-group">
          <label for="tattooDesign">Desenho da Tatuagem:</label>
          <textarea
            id="tattooDesign"
            name="tattooDesign"
            [(ngModel)]="appointment.tattooDesign"
            required
            class="form-control"
          ></textarea>
        </div>

        <div class="form-group">
          <label class="checkbox-label">
            <input
              type="checkbox"
              name="depositPaid"
              [(ngModel)]="appointment.depositPaid"
            >
            Taxa de agendamento paga
          </label>
        </div>

        <button type="submit" [disabled]="!form.valid" class="submit-btn">
          Agendar
        </button>
      </form>
    </div>
  `,
  styles: [`
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }

    .appointment-form {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .form-group {
      margin-bottom: 15px;
    }

    .form-control {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-top: 5px;
    }

    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .submit-btn {
      background: #4CAF50;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
    }

    .submit-btn:disabled {
      background: #cccccc;
      cursor: not-allowed;
    }

    textarea {
      min-height: 100px;
      resize: vertical;
    }
  `]
})
export class AppointmentFormComponent {
  appointment: Appointment = {
    clientName: '',
    date: '',
    time: '',
    price: 0,
    tattooLocation: '',
    tattooDesign: '',
    depositPaid: false
  };

  onSubmit() {
    console.log('Agendamento realizado:', this.appointment);
    // Aqui você pode adicionar a lógica para salvar o agendamento
    this.resetForm();
  }

  private resetForm() {
    this.appointment = {
      clientName: '',
      date: '',
      time: '',
      price: 0,
      tattooLocation: '',
      tattooDesign: '',
      depositPaid: false
    };
  }
}