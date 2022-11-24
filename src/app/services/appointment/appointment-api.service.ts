import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { validate, validateSync, ValidationError } from 'class-validator';
import { catchError, delay, filter, from, last, map, mergeMap, mergeScan, Observable, of, partition, reduce, retry, retryWhen, scan, switchMap, switchScan, tap, zip } from 'rxjs';
import { ResourceFactory } from 'src/app/factories/resource.factory';
import { Appointment } from 'src/app/models/appointment.model';
import { BundleEntry } from 'src/app/models/bundle-entry.model';
import { Bundle } from 'src/app/models/bundle.model';
import { Resource } from 'src/app/models/resource.model';
import { validateClass } from 'src/app/utils/operators/validate.operator';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentApiService {
  private url = this.env.getValue('apiUrl');

  constructor(
    private http: HttpClient,
    private env: EnvironmentService,
  ) {}

  getAppointments$(count = 10) {
    return this.http.get<Bundle>(`${this.url}/Appointment`, {
      params: {
        '_count': count,
      }
    }).pipe(
      retry({ count: 2, delay: 3000}),
    );
  }
}
