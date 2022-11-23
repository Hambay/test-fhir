import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';

import { AppComponent } from './app.component';
import { ENVIRONMENT } from './services/environment/environment.service';
import { environment } from 'src/environments/environment';
import { PatientAppointmentsComponent } from './components/patient-appointments/patient-appointments.component';

@NgModule({
  declarations: [
    AppComponent,
    PatientAppointmentsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CardModule,
    ButtonModule,
    BadgeModule,
  ],
  providers: [
    {
      provide: ENVIRONMENT,
      useValue: environment,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
