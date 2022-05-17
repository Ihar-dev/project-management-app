import { HttpErrorCode } from '../constants';

export const filesMessages = [
  {
    statusCode: HttpErrorCode.NOT_FOUND,
    message: 'File was not founded!',
  },
  {
    statusCode: HttpErrorCode.CONFLICT,
    message: 'File already exists!',
  },
];
