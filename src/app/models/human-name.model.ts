import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator'
import { HumanNameUse } from '../enums/human-name-use.enum';
import { IsFhirCode } from '../utils/decorators/validators/is-fhir-code.decorator';
import { Period } from './period.model'

export class HumanName {
  @IsOptional()
  @IsFhirCode()
  @IsEnum(HumanNameUse)
  use?: HumanNameUse

  @IsOptional()
  @IsString()
  text?: string; // Text representation of the full name

  @IsOptional()
  @IsString()
  family?: string; // Family name (often called 'Surname')

  @IsOptional()
  @IsString({ each: true })
  given?: string[]; // Given names (not always 'first'). Includes middle names

  @IsOptional()
  @IsString({ each: true })
  prefix?: string[]; // Parts that come before the name

  @IsOptional()
  @IsString({ each: true })
  suffix?: string[]; // Parts that come after the name

  @IsOptional()
  @ValidateNested()
  period?: Period; // Time period when name was/is in use

  get fullName(): string {
    return this.text ?? `${this.family} ${this.given?.join(' ')}`;
  }

  constructor(dto: HumanName) {
    this.use = dto.use;
    this.text = dto.text;
    this.family = dto.family;
    this.given = dto.given;
    this.prefix = dto.prefix;
    this.suffix = dto.suffix;
    this.period = dto.period ? new Period(dto.period) : undefined;
  }
}
