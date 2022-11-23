import { IsEnum, IsOptional } from 'class-validator';
import { ResourceType } from '../enums/resourse-type.enum';

export class Reference {
  @IsOptional()
  reference?: string;

  @IsOptional()
  @IsEnum(ResourceType)
  type?: ResourceType;
  
  @IsOptional()
  display?: string;

  constructor(dto: Reference) {
    this.reference = dto.reference;
    this.type = dto.type;
    this.display = dto.display;
  }
}