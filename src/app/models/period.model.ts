import { IsOptional } from 'class-validator';
import { IsFhirDateTime } from '../utils/decorators/validators/is-fhir-date-time.decorator';

export class Period {
  @IsOptional()
  @IsFhirDateTime()
  start?: Date;
  
  @IsOptional()
  @IsFhirDateTime()
  end?: Date;

  constructor(dto: Period) {
    this.start = dto.start;
    this.end = dto.end;
  }
}