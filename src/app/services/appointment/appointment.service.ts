import { Injectable } from '@angular/core';
import { AppointmentApiService } from './appointment-api.service';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private appointmentApiService: AppointmentApiService) {}

}
