import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { validate } from 'class-validator';
import { catchError, from, map, of, retry, switchMap, zip } from 'rxjs';
import { Patient } from 'src/app/models/patient.model';
import { validateClass } from 'src/app/utils/operators/validate.operator';
import { EnvironmentService } from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class PatientApiService {
  private url = this.env.getValue('apiUrl');

  constructor(
    private http: HttpClient,
    private env: EnvironmentService,
  ) {}

  public getPatient$(idOrReference: string) {
    console.log('getPatient by', idOrReference);
    
    const reference = idOrReference.includes('/') ?
        idOrReference:
       `Patient/${idOrReference}`;

    return this.http.get<Patient>(`${this.url}/${reference}`).pipe(
      retry({ count: 2, delay: 3000}),
    );
  }
}
