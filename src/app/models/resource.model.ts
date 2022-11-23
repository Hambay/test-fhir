import { IsEnum, IsOptional } from 'class-validator';
import { ResourceType } from '../enums/resourse-type.enum';
import { IsFhirId } from '../utils/decorators/validators/is-fhir-id.decorator';

export class Resource {
  @IsOptional()
  @IsFhirId()
  id?: string;

  @IsEnum(ResourceType)
  resourceType: ResourceType;

  constructor(dto: Resource) {
    this.id = dto.id;
    this.resourceType = dto.resourceType;
  }
}