import { TValidationError } from '../models/validation-error.model';

export const ERRORS_MESSAGES_LOGIN: TValidationError = {
  login: [
    {
      type: 'required',
      message: 'Please enter a login.',
      transloco: 'login',
    },
  ],
  password: [
    {
      type: 'required',
      message: 'Please enter a password.',
      transloco: 'password',
    },
  ],
};
