import { Equals, IsBoolean, IsEnum, IsOptional, ValidateNested } from 'class-validator';
import { Gender } from '../enums/genders.enum';
import { ResourceType } from '../enums/resourse-type.enum';
import { IsFhirCode } from '../utils/decorators/validators/is-fhir-code.decorator';
import { IsFhirDate } from '../utils/decorators/validators/is-fhir-date.decorator';
import { Appointment } from './appointment.model';
import { HumanName } from './human-name.model';
import { Resource } from './resource.model';

export class Patient extends Resource {
  @Equals(ResourceType.Patient)
  override resourceType: ResourceType.Patient;

  @IsOptional()
  @IsBoolean()
  active?: boolean; // Whether this patient's record is in active use

  @IsOptional()
  @ValidateNested()
  name?: HumanName[]; // A name associated with the patient

  @IsOptional()
  @IsFhirCode()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsFhirDate()
  birthDate: Date; // The date of birth for the individual

  appointments?: Appointment[];

  constructor(dto: Patient) {
    super(dto);
    
    this.id = dto.id;
    this.resourceType = dto.resourceType;
    this.active = !!dto.active;
    this.gender = dto.gender;
    this.birthDate = dto.birthDate;

    if (Array.isArray(dto.name)) {
      this.name = dto.name.map(item => new HumanName(item))
    }
  }
}