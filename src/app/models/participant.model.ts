import { IsEnum, IsOptional, ValidateNested } from 'class-validator'
import { PaticipationStatus } from '../enums/participation-status.enum';
import { IsFhirCode } from '../utils/decorators/validators/is-fhir-code.decorator';
import { Period } from './period.model'
import { Reference } from './reference.model';

export class Participant {
  @IsFhirCode()
  @IsEnum(PaticipationStatus)
  status: PaticipationStatus;

  @IsOptional()
  @ValidateNested()
  actor?: Reference;

  @IsOptional()
  @ValidateNested()
  period?: Period;

  constructor(dto: Participant) {
    this.status = dto.status;

    this.actor = dto.actor ? new Reference(dto.actor) : undefined;
    this.period = dto.period ? new Period(dto.period) : undefined;
  }
}
