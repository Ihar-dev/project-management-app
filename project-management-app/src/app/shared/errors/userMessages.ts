import { HttpErrorCode } from '../constants';

export const userMessages = [
  {
    statusCode: HttpErrorCode.NOT_FOUND,
    message: 'User was not founded!',
  },
  {
    statusCode: HttpErrorCode.BAD_REQUEST,
    message: 'No such user.',
  },
];
