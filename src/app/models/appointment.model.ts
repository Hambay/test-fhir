import { Equals, IsArray, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { AppointmentStatus } from '../enums/appointment-status.enum';
import { ResourceType } from '../enums/resourse-type.enum';
import { IsFhirInstant } from '../utils/decorators/validators/is-fhir-instant.decorator';
import { Participant } from './participant.model';
import { Resource } from './resource.model';

export class Appointment extends Resource {
  @Equals(ResourceType.Appointment)
  override resourceType: ResourceType;

  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;
    
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested()
  participant: Participant[]

  @IsOptional()
  @IsFhirInstant()
  start: Date;

  @IsOptional()
  @IsFhirInstant()
  end: Date;

  constructor(dto: Appointment) {
    super(dto);

    this.id = dto.id;
    this.resourceType = dto.resourceType;
    this.status = dto.status;
    this.description = dto.description;
    this.start = dto.start;
    this.end = dto.end;

    if (Array.isArray(dto.participant)) {
      this.participant = dto.participant.map(item => new Participant(item))
    }
  }
} 