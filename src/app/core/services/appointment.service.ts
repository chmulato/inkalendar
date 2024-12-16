import { Injectable } from '@angular/core';
import { 
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { FirebaseService } from './firebase.service';
import { Appointment } from '../models/appointment.model';
import { from, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private readonly firestore: Firestore;
  private readonly collectionName = 'appointments';

  constructor(private firebaseService: FirebaseService) {
    this.firestore = this.firebaseService.getFirestore();
  }

  createAppointment(appointment: Omit<Appointment, 'id'>): Observable<string> {
    const appointmentWithTimestamp = {
      ...appointment,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };

    return from(
      addDoc(collection(this.firestore, this.collectionName), appointmentWithTimestamp)
    ).pipe(
      map(docRef => docRef.id)
    );
  }

  getAppointments(): Observable<Appointment[]> {
    const q = query(
      collection(this.firestore, this.collectionName),
      orderBy('date', 'desc')
    );

    return from(getDocs(q)).pipe(
      map(snapshot => 
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...this.convertTimestamps(doc.data())
        } as Appointment))
      )
    );
  }

  getMonthlyAppointments(month: number, year: number): Observable<Appointment[]> {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);

    const q = query(
      collection(this.firestore, this.collectionName),
      where('date', '>=', startDate),
      where('date', '<=', endDate),
      orderBy('date', 'asc')
    );

    return from(getDocs(q)).pipe(
      map(snapshot => 
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...this.convertTimestamps(doc.data())
        } as Appointment))
      )
    );
  }

  private convertTimestamps(data: DocumentData): any {
    const converted = { ...data };
    for (const [key, value] of Object.entries(converted)) {
      if (value instanceof Timestamp) {
        converted[key] = value.toDate().toISOString();
      }
    }
    return converted;
  }
}