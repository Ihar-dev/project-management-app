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
  hourSix = 21600000,
  hour = 3600000,
  hourHalf = 1800000,
  minute = 60000,
}

export const HTTP_ERROR_MESSAGE_DEFAULT = {
  message: 'An error occurred. Please try again later.',
  transloco: 'error.default-error',
};

export type TErrorHandler = (error: HttpErrorResponse, storeAction: string) => Observable<never>;

export const TOKEN_EXP_QUERY_KEY = 'token';
export const TOKEN_EXP_QUERY_VALUE = 'expired';
