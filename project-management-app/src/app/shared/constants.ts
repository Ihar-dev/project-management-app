export enum ErrorMessage {
  forbidden = 403,
  success = 200,
}

export const USER_TOKEN_KEY = '___user-token___';

export enum Url {
  SIGN_UP = 'signup',
  SIGN_IN = 'signin',
  USERS = 'users',
}

export enum TokenLimit {
  day = 86400000,
  hour = 3600000,
  hourHalf = 1800000,
  minutesThree = 180000,
}
