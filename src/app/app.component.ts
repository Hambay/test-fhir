import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Patient } from './models/patient.model';
import { AppointmentApiService } from './services/appointment/appointment-api.service';
import { PatientStateService } from './services/patient/patient-state.service';
import { PatientService } from './services/patient/patient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'test-fhir';

  destroyer$: Subject<void> = new Subject();

  constructor(
    private patientService: PatientService,
    private appointmentApiService: AppointmentApiService,
    private patientStateService: PatientStateService,
  ) {}

  ngOnInit(): void {
    this.getAppointments()
  }

  ngOnDestroy() {
    this.destroyer$.next();
    this.destroyer$.complete();
  }

  get patients$() {
    return this.patientStateService.value$;
  }

  getAppointments() {
    this.appointmentApiService.getAppointments$().pipe(
      tap(console.log),
      switchMap(appointments => {
        return this.patientService.getPatientsByAppointments$(appointments)
      }),
      takeUntil(this.destroyer$),
    ).subscribe(patients => {
        console.log(patients)
      })
  }
}
