import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/appointment.model';

@Component({
  selector: 'app-patient-appointments',
  templateUrl: './patient-appointments.component.html',
  styleUrls: ['./patient-appointments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientAppointmentsComponent {
  @Input()
  appointments: Appointment[];
}
