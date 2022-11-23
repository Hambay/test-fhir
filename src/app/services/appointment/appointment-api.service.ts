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
    private resourceFactory: ResourceFactory,
  ) {}

  getAppointments$(count = 10) {
    return this.http.get<Bundle>(`${this.url}/Appointment`, {
      params: {
        '_count': count,
      }
    }).pipe(
      retry({ count: 2, delay: 3000}),
      // создание инстанса класса
      map(bundleDto => {
        return new Bundle(bundleDto, this.resourceFactory.create);
      }),
      // валидация Bundle
      validateClass,
      // создание потока вхождений (entry) бандла
      switchMap(([bundle, errors]) => {
        if (errors.length) throw errors;

        return from(bundle.entry);
      }),
      // валидация entry
      validateClass,
      // сбор провалидированных данных в массив если в них нет ошибок
      reduce((acc: BundleEntry<Resource>[], [entry, errors]) => {
        if (errors.length) return acc;

        acc.push(entry);
        return acc;
      }, []),
      map(entry => {
        const appointments = entry
          .map(entry => entry.resource)
          .filter(resource => resource instanceof Appointment);

        return appointments as Appointment[];
      }),
      catchError(errors => {
        console.error(errors);
        return of([]);
      })
    )
  }
}
