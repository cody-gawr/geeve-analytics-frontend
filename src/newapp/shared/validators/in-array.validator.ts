// validators/in-array.validator.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Returns a ValidatorFn which checks that the control's value
 * is included in the provided array of allowed values.
 *
 * @param allowedValues An array of permissible values
 */
export function inArrayValidator<T>(allowedValues: T[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const val = control.value as T;
    // If control is empty, let required() or other validators handle it
    if (val == null || val === '') {
      return null;
    }
    return allowedValues.includes(val)
      ? null
      : { notInArray: { actual: val, allowed: allowedValues } };
  };
}
