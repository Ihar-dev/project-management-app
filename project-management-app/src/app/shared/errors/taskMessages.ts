import { HttpErrorCode } from '../constants';

export const taskMessages = [
  {
    statusCode: HttpErrorCode.NOT_FOUND,
    message: 'Task was not founded!',
  },
  {
    statusCode: HttpErrorCode.BAD_REQUEST,
    message: 'Task title and description should not be empty.',
  },
];
