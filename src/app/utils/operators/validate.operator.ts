import { validate, ValidationError } from 'class-validator';
import { from, mergeMap, Observable, of, switchMap, zip } from 'rxjs';

export function validateClass<T>(source$: Observable<T & object>): Observable<[T, ValidationError[]]> {
  return source$.pipe(
    mergeMap(value => zip(
      of(value),
      from(validate(value))
    )),
  );
}
