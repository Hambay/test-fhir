import { Equals, IsArray, IsEnum } from 'class-validator';
import { BundleType } from '../enums/bundle-type.enum';
import { ResourceType } from '../enums/resourse-type.enum';
import { BundleEntry } from './bundle-entry.model';
import { Resource } from './resource.model';

export class Bundle extends Resource {
  @Equals(ResourceType.Bundle)
  override resourceType: ResourceType;

  @IsEnum(BundleType)
  type: BundleType;

  @IsArray()
  entry: BundleEntry<Resource>[];

  constructor(
    dto: Bundle,
    entryFactory: (item: Resource) => Resource
  ) {
    super(dto);

    this.id = dto.id;
    this.resourceType = dto.resourceType;
    this.type = dto.type;

    if (Array.isArray(dto.entry)) {
      this.entry = dto.entry.map(item => new BundleEntry(item, entryFactory))
    }
  }
}