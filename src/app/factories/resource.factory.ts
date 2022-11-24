import { Injectable } from '@angular/core';
import { ResourceType } from '../enums/resourse-type.enum';
import { Appointment } from '../models/appointment.model';
import { Bundle } from '../models/bundle.model';
import { Patient } from '../models/patient.model';
import { Resource } from '../models/resource.model';
import { Resources } from '../unions/resources.union';

@Injectable({
  providedIn: 'root'
})
export class ResourceFactory {
  constructor() {}

  create(dto: Resources): Resources {
    switch (dto.resourceType) {
      case ResourceType.Patient:
        return new Patient(dto);
    
      case ResourceType.Appointment:
        return new Appointment(dto);
    
      case ResourceType.Bundle:
        return new Bundle(dto, this.create);

      default:
        throw new Error(`unknown resourceType`);
    }
  }
}
