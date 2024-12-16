import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where,
  orderBy
} from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { Appointment } from '../models/appointment';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private firestore: Firestore;
  private appointmentsCollection = 'appointments';

  constructor(private firebaseService: FirebaseService) {
    this.firestore = this.firebaseService.getFirestore();
  }

  async createAppointment(appointment: Appointment): Promise<string> {
    try {
      const docRef = await addDoc(
        collection(this.firestore, this.appointmentsCollection), 
        appointment
      );
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      throw error;
    }
  }

  async getAppointments(): Promise<Appointment[]> {
    try {
      const q = query(
        collection(this.firestore, this.appointmentsCollection),
        orderBy('date', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Appointment));
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
      throw error;
    }
  }

  async getMonthlyAppointments(month: number, year: number): Promise<Appointment[]> {
    try {
      const startDate = new Date(year, month, 1).toISOString();
      const endDate = new Date(year, month + 1, 0).toISOString();
      
      const q = query(
        collection(this.firestore, this.appointmentsCollection),
        where('date', '>=', startDate),
        where('date', '<=', endDate)
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Appointment));
    } catch (error) {
      console.error('Erro ao buscar agendamentos mensais:', error);
      throw error;
    }
  }
}