import { FormFieldLength } from '../constants';
import { TValidationError } from '../models/validation-error.model';

export const ERRORS_MESSAGES_SIGNUP: TValidationError = {
  name: [
    { type: 'required', message: 'Please enter a name.' },
    {
      type: 'minlength',
      message: `The min length is ${FormFieldLength.name} symbols.`,
    },
  ],
  login: [
    {
      type: 'required',
      message: 'Please enter a login.',
    },
    {
      type: 'minlength',
      message: `The min length is ${FormFieldLength.login} symbols.`,
    },
  ],
  password: [
    {
      type: 'required',
      message: 'Please enter a password.',
    },
    {
      type: 'minlength',
      message: `The min length is ${FormFieldLength.password} characters.`,
    },
    {
      type: 'upLowCase',
      message: `Should include uppercase and lowercase letters.`,
    },
    {
      type: 'digits',
      message: `Should include at least 1 digit.`,
    },
    {
      type: 'specialCharacters',
      message: `Should include 1 special character (!@#$%^&?[]).`,
    },
  ],
  confirmPassword: [
    {
      type: 'required',
      message: 'Please confirm a password.',
    },
    {
      type: 'passwordMismatch',
      message: 'Passwords do not match!',
    },
  ],
};
