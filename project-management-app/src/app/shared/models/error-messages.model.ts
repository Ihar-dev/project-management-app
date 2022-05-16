import { HttpErrorCode } from '../constants';
import { IHttpErrorMessage } from './http-error-message.model';

enum BoardMessageType {
  board = 'Board',
  column = 'Column',
  task = 'Task',
}
//do not provide messages longer than 50 symbols. They will be truncated.
export class ErrorMessages {
  static get authMessages(): IHttpErrorMessage[] {
    return [
      {
        statusCode: HttpErrorCode.FORBIDDEN,
        message: 'Wrong login or password.',
      },
      {
        statusCode: HttpErrorCode.CONFLICT,
        message: 'User login already exists!',
      },
    ];
  }

  static get userMessages(): IHttpErrorMessage[] {
    return [
      {
        statusCode: HttpErrorCode.NOT_FOUND,
        message: 'User was not founded!',
      },
      {
        statusCode: HttpErrorCode.BAD_REQUEST,
        message: 'No such user.',
      },
    ];
  }

  static get fileMessages(): IHttpErrorMessage[] {
    return [
      {
        statusCode: HttpErrorCode.NOT_FOUND,
        message: 'File was not founded!',
      },
      {
        statusCode: HttpErrorCode.CONFLICT,
        message: 'File already exists!',
      },
    ];
  }

  static get taskMessages(): IHttpErrorMessage[] {
    return this.getBoardMessages(BoardMessageType.task);
  }

  static get columnMessages(): IHttpErrorMessage[] {
    return this.getBoardMessages(BoardMessageType.column);
  }

  static get boardMessages(): IHttpErrorMessage[] {
    return this.getBoardMessages(BoardMessageType.board);
  }

  private static getBoardMessages(itemType: BoardMessageType): IHttpErrorMessage[] {
    return [
      {
        statusCode: HttpErrorCode.NOT_FOUND,
        message: `${itemType} was not founded!`,
      },
      {
        statusCode: HttpErrorCode.BAD_REQUEST,
        message: `Title ${
          itemType === BoardMessageType.column ? '' : 'and description'
        } should not be empty.`,
      },
    ];
  }
}
