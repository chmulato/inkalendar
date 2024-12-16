export interface Appointment {
  id?: string;
  clientName: string;
  date: string;
  time: string;
  price: number;
  tattooLocation: string;
  tattooDesign: string;
  depositPaid: boolean;
  createdAt?: string;
  updatedAt?: string;
}