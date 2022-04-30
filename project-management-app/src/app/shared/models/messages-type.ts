//do not provide messages longer than 50 symbols. They will be truncated.
export enum MessagesDefault {
  error = 'An error occured. Please try again later.',
  signedUp = 'Your account has been created! Please sign in.',
}

export type MessageState = {
  isShown: boolean;
  message: MessagesDefault | string;
};
