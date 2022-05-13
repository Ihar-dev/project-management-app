import { FormControlName } from '../constants';
import { ERRORS_MESSAGES_OLD_PASSWORD } from './error-messages-old-pass';
import { ERRORS_MESSAGES_SIGNUP } from './error-messages-signup';

export const ERRORS_MESSAGES_EDIT_PROFILE_NAME = {
  name: ERRORS_MESSAGES_SIGNUP[FormControlName.name],
  login: ERRORS_MESSAGES_SIGNUP[FormControlName.login],
  oldPassword: ERRORS_MESSAGES_OLD_PASSWORD[FormControlName.oldPassword],
};
