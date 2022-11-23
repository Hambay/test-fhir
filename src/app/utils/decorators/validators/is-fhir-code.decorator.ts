import { Matches, ValidationOptions } from 'class-validator';

export const codeRegex = /[^\s]+(\s[^\s]+)*/;

export function IsFhirCode(validationOptions?: ValidationOptions) {
  return Matches(codeRegex, validationOptions);
}
