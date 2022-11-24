import { Injectable } from '@angular/core';
import { count, map, switchMap, from, reduce, catchError, of } from 'rxjs';
import { ResourceFactory } from 'src/app/factories/resource.factory';
import { Appointment } from 'src/app/models/appointment.model';
import { BundleEntry } from 'src/app/models/bundle-entry.model';
import { Bundle } from 'src/app/models/bundle.model';
import { Resource } from 'src/app/models/resource.model';
import { Resources } from 'src/app/unions/resources.union';
import { validateClass } from 'src/app/utils/operators/validate.operator';
import { AppointmentApiService } from './appointment-api.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(
    private appointmentApiService: AppointmentApiService,
    private resourceFactory: ResourceFactory,
  ) {}

  getAppointments$(count = 10) {
    return this.appointmentApiService.getAppointments$(count).pipe(
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
      reduce((acc: BundleEntry<Resources>[], [entry, errors]) => {
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
