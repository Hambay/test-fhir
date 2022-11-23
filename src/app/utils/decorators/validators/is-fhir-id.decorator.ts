import { Matches, ValidationOptions } from 'class-validator';

export const idRegex = /[A-Za-z0-9\-\.]{1,64}/;

export function IsFhirId(validationOptions?: ValidationOptions) {
  return Matches(idRegex, validationOptions);
}
