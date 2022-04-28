export enum MessagesDefault {
  error = 'Some error occured. Please try again later.',
  signedUp = 'Your account has been created! Please sign in.',
}

export type MessageState = {
  isShown: boolean;
  message: MessagesDefault | string;
};
