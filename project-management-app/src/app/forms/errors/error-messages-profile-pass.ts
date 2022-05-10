import { FormControlNames } from '../constants';
import { ERRORS_MESSAGES_OLD_PASSWORD } from './error-messages-old-pass';
import { ERRORS_MESSAGES_SIGNUP } from './error-messages-signup';

export const ERRORS_MESSAGES_EDIT_PROFILE_PASS = {
  password: ERRORS_MESSAGES_SIGNUP[FormControlNames.password],
  confirmPassword: ERRORS_MESSAGES_SIGNUP[FormControlNames.confirmPassword],
  oldPassword: ERRORS_MESSAGES_OLD_PASSWORD[FormControlNames.oldPassword],
};
