//do not provide messages longer than 50 symbols. They will be truncated.
export type MessageState = {
  isShown: boolean;
  message: HttpErrorMessage;
};

export enum HttpErrorMessage {
  default = 'An error occured. Please try again later.',
  wrongData = 'The data already exists.',
  notFound = 'The item was not founded! Try again later.',
}

export enum HttpErrorMessageAuth {
  conflict = 'User login already exists!',
  forbidden = 'Wrong login or password.',
}

export enum HttpErrorMessageBoard {
  notFound = 'Board was not founded!',
  badRequest = 'Title and description should not be empty',
}

export enum HttpErrorMessageColumn {
  notFound = 'Column was not founded!',
  badRequest = 'Title should not be empty',
}

export enum HttpErrorMessageTask {
  notFound = 'Task was not founded!',
  badRequest = 'Title and description should not be empty',
}
export enum HttpErrorMessageUser {
  notFound = 'User was not founded!',
}

export const ErrorMessage = {
  HttpErrorMessage,
  HttpErrorMessageAuth,
  HttpErrorMessageBoard,
  HttpErrorMessageColumn,
  HttpErrorMessageTask,
  HttpErrorMessageUser,
};
export type TError = typeof ErrorMessage;
