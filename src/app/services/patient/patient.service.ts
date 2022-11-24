import { Injectable } from '@angular/core';
import { catchError, combineLatest, map, Observable, of, tap } from 'rxjs';
import { ResourceType } from 'src/app/enums/resourse-type.enum';
import { Appointment } from 'src/app/models/appointment.model';
import { Patient } from 'src/app/models/patient.model';
import { validateClass } from 'src/app/utils/operators/validate.operator';
import { PatientApiService } from './patient-api.service';
import { PatientStateService } from './patient-state.service';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(
    private patientApiService: PatientApiService,
    private patientStateService: PatientStateService,
  ) {}

  getPatient$(id: string): Observable<Patient | undefined> {
    return this.patientApiService.getPatient$(id).pipe(
      map(dto => {
        return new Patient(dto);
      }),
      validateClass,
      map(([item, errors]) => {
        if (errors.length) throw errors

        return item;
      }),
      catchError(error => {
        console.error(error);
        return of(undefined);
      })
    );
  }

  getPatientsByAppointments$(appointments: Appointment[]): Observable<Patient[]> {
    const mapRefs = this.getPatientsFromAppointments(appointments);
    const refs = Array.from(mapRefs.keys());

    console.log('refs to get patients', refs);
    console.log('map ref => appointment[]', mapRefs);
    
    const requests = refs.map(this.getPatient$.bind(this));

    return combineLatest(requests).pipe(
      map(patients => {
        const filtered = patients.filter(item => !!item)
        return filtered as Patient[];
      }),
      map(patients => patients.map(patient => {
        patient.appointments = mapRefs.get(`${patient.resourceType}/${patient.id}`);
        return patient;
        })),
      tap(patients => this.patientStateService.value = patients),
    );
  }

  getPatientsFromAppointments(appointments: Appointment[]): Map<string, Appointment[]> {
    const map: Map<string, Appointment[]> = new Map();

    appointments.forEach(
      appointment => appointment.participant?.forEach(
        participant => {
          const ref = participant.actor?.reference;
          
          if (!ref) return;

          if ((new RegExp(ResourceType.Patient, 'g')).test(ref)) {
            const appointments = map.get(ref) ?? [];
            appointments.push(appointment);

            map.set(ref, appointments);
          }
        })
      );

    return map;
  }
}
