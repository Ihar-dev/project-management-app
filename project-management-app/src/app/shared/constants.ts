import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

export enum HttpErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
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

export const HTTP_ERROR_MESSAGE_DEFAULT = 'An error occured. Please try again later.';

export type TErrorHandler = (error: HttpErrorResponse, storeAction: string) => Observable<never>;
