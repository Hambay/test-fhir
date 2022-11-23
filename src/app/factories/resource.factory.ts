import { Injectable } from '@angular/core';
import { ResourceType } from '../enums/resourse-type.enum';
import { Appointment } from '../models/appointment.model';
import { Bundle } from '../models/bundle.model';
import { Patient } from '../models/patient.model';
import { Resource } from '../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceFactory {
  constructor() {}

  create(dto: Resource) {
    switch (dto.resourceType) {
      case ResourceType.Patient:
        return new Patient(dto as Patient);
    
      case ResourceType.Appointment:
        return new Appointment(dto as Appointment);
    
      case ResourceType.Bundle:
        return new Bundle(dto as Bundle, this.create);

      default:
        throw new Error(`unknown resourceType: ${dto.resourceType}`);
    }
  }
}
