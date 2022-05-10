import { TValidationError } from '../models/validation-error.model';
import { ERRORS_MESSAGES_SIGNUP } from './error-messages-signup';

const ERRORS_MESSAGES_OLD_PASSWORD: TValidationError = {
  oldPassword: [
    {
      type: 'required',
      message: 'Please enter a password.',
    },
    {
      type: 'wrongPass',
      message: 'Wrong password!',
    },
  ],
};

export const ERRORS_MESSAGES_EDIT_PROFILE = {
  ...ERRORS_MESSAGES_SIGNUP,
  ...ERRORS_MESSAGES_OLD_PASSWORD,
};
