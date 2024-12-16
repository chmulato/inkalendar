import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { FirebaseService, AuthService, AppointmentService } from './app/core/services';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    FirebaseService,
    AuthService,
    AppointmentService
  ]
});