import { AbstractControl, ValidatorFn, ValidationErrors, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export function asyncFullNameValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const value = control.value as string;

    if (value) {
      const parts = value.split(' ');

      if (parts.length !== 2) {
        return of({ fullName: 'First name and surname must be separated' });
      }
    }

    return of(null);
  };
}
