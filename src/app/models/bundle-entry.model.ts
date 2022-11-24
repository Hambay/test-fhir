import { IsUrl, ValidateNested } from 'class-validator';
import { Resources } from '../unions/resources.union';

export class BundleEntry<TResource extends Resources> {
  @ValidateNested()
  resource: TResource;

  @IsUrl()
  fullUrl: string;

  constructor(
    dto: BundleEntry<TResource>,
    entryFactory: (item: Resources) => TResource
  ) {
    this.resource = entryFactory(dto.resource);
    this.fullUrl = dto.fullUrl;
  }
}