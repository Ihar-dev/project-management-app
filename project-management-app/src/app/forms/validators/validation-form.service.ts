import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { FormControlName } from 'src/app/forms/constants';

@Injectable({
  providedIn: 'root',
})
export class ValidationFormService {
  validatePassword(): ValidatorFn {
    return (control: AbstractControl) => {
      if (!control.value) {
        return null;
      }
      const regexpUpLowerCase = /^(?=.*?[A-Z])(?=.*?[a-z]).*$/;
      const regexpDigits = /^(?=.*?\d).*$/;
      const regexpSpecialCharacters = /^(?=.*[!@#$%^&?[\]]).*$/;
      const regexpMinLength = /^.{8,}$/;

      if (!control.value.match(regexpUpLowerCase)) {
        return { upLowCase: true };
      }

      if (!control.value.match(regexpDigits)) {
        return { digits: true };
      }

      if (!control.value.match(regexpSpecialCharacters)) {
        return { specialCharacters: true };
      }

      if (!control.value.match(regexpMinLength)) {
        return { minlength: true };
      }

      return null;
    };
  }

  confirmPassword(): ValidatorFn {
    return (control: AbstractControl) => {
      const passwordControl = control.get(FormControlName.password);
      const confirmPasswordControl = control.get(FormControlName.confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        const errorValue = { passwordMismatch: true };
        confirmPasswordControl.setErrors(errorValue);

        return errorValue;
      }

      return null;
    };
  }
}
