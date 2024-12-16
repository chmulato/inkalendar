import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { MonthlyReportComponent } from './components/reports/monthly-report.component';
import { AnnualReportComponent } from './components/reports/annual-report.component';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'appointments', pathMatch: 'full' },
      { path: 'appointments', component: AppointmentListComponent },
      { path: 'new-appointment', component: AppointmentFormComponent },
      { path: 'monthly-report', component: MonthlyReportComponent },
      { path: 'annual-report', component: AnnualReportComponent }
    ]
  }
];