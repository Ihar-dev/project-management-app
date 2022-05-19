import { TValidationError } from '../models/validation-error.model';

export const ERRORS_MESSAGES_OLD_PASSWORD: TValidationError = {
  oldPassword: [
    {
      type: 'required',
      message: 'Please enter a password.',
      transloco: 'password',
    },
    {
      type: 'wrongPass',
      message: 'Wrong password!',
      transloco: 'password-wrong',
    },
  ],
};
