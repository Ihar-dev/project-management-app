import { HttpErrorCode } from '../constants';

export const authMessages = [
  {
    statusCode: HttpErrorCode.FORBIDDEN,
    message: 'Wrong login or password.',
  },
  {
    statusCode: HttpErrorCode.CONFLICT,
    message: 'User login already exists!',
  },
];
