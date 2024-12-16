export interface Appointment {
  id?: number;
  clientName: string;
  date: string;
  time: string;
  price: number;
  tattooLocation: string;
  tattooDesign: string;
  depositPaid: boolean;
}