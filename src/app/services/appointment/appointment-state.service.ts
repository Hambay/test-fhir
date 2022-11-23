import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Appointment } from 'src/app/models/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentStateService {
  private _value: BehaviorSubject<Appointment[]> = new BehaviorSubject(new Array());

  get value() {
    return this._value.getValue();
  }

  get value$() {
    return this._value.asObservable().pipe();
  }

  constructor() {}

  set value(value: Appointment[]) {
    this._value.next(value);
  }
}
