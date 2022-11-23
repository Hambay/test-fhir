import { Matches, ValidationOptions } from 'class-validator';

export const dateRegex =
  /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/;

export function IsFhirDate(validationOptions?: ValidationOptions) {
  return Matches(dateRegex, validationOptions);
}
