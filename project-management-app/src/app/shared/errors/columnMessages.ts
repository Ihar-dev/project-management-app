import { HttpErrorCode } from '../constants';

export const columnMessages = [
  {
    statusCode: HttpErrorCode.NOT_FOUND,
    message: 'Column was not founded!',
  },
  {
    statusCode: HttpErrorCode.BAD_REQUEST,
    message: 'Column title should not be empty.',
  },
];
