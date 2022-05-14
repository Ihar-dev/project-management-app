import { FormFieldLength } from '../constants';
import { TValidationError } from '../models/validation-error.model';

export const ERRORS_MESSAGES_SIGNUP: TValidationError = {
  name: [
    {
      type: 'required',
      message: 'Please enter a name.',
      transloco: 'name',
    },
    {
      type: 'minlength',
      message: `The min length is ${FormFieldLength.name} symbols.`,
      transloco: 'length',
      length: FormFieldLength.name,
    },
  ],
  login: [
    {
      type: 'required',
      message: 'Please enter a login.',
      transloco: 'login',
    },
    {
      type: 'minlength',
      message: `The min length is ${FormFieldLength.login} symbols.`,
      transloco: 'length',
      length: FormFieldLength.login,
    },
  ],
  password: [
    {
      type: 'required',
      message: 'Please enter a password.',
      transloco: 'password',
    },
    {
      type: 'minlength',
      message: `The min length is ${FormFieldLength.password} symbols.`,
      transloco: 'length',
      length: FormFieldLength.password,
    },
    {
      type: 'upLowCase',
      message: `Include uppercase and lowercase letters.`,
      transloco: 'password-upLowCase',
    },
    {
      type: 'digits',
      message: `Include at least 1 digit.`,
      transloco: 'password-digits',
    },
    {
      type: 'specialCharacters',
      message: `Include 1 special character (!@#$%^&?[]).`,
      transloco: 'password-special',
    },
  ],
  confirmPassword: [
    {
      type: 'required',
      message: 'Please confirm a password.',
      transloco: 'password-confirm',
    },
    {
      type: 'passwordMismatch',
      message: 'Passwords do not match!',
      transloco: 'password-match',
    },
  ],
};
