import { IsUrl, ValidateNested } from 'class-validator';
import { Resource } from './resource.model';

export class BundleEntry<TResource extends Resource> {
  @ValidateNested()
  resource: TResource;

  @IsUrl()
  fullUrl: string;

  constructor(
    dto: BundleEntry<TResource>,
    entryFactory: (item: Resource) => TResource
  ) {
    this.resource = entryFactory(dto.resource);
    this.fullUrl = dto.fullUrl;
  }
}