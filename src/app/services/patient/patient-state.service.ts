import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientStateService {
  private _value: BehaviorSubject<Patient[]> = new BehaviorSubject(new Array());

  get value() {
    return this._value.getValue();
  }

  get value$() {
    return this._value.asObservable().pipe();
  }

  constructor() {}

  set value(value: Patient[]) {
    this._value.next(value);
  }
}
