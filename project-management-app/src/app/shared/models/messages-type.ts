//do not provide messages longer than 50 symbols. They will be truncated.
export enum ErrorMessage {
  default = 'An error occured. Please try again later.',
  wrongAuthData = 'Wrong login or password.',
  wrongData = 'The data already exists.',
  notFound = 'The item was not founded! Try again later.',
}

export type MessageState = {
  isShown: boolean;
  message: ErrorMessage;
};
