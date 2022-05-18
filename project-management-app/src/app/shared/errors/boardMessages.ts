import { HttpErrorCode } from '../constants';

export const boardMessages = [
  {
    statusCode: HttpErrorCode.NOT_FOUND,
    message: 'Board was not founded!',
  },
  {
    statusCode: HttpErrorCode.BAD_REQUEST,
    message: 'Board title and description should not be empty.',
  },
];
