import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IColumnRequest } from 'src/app/shared/models/column-request.model';
import { IColumn } from 'src/app/shared/models/column.model';
import { IHttpErrorMessage } from 'src/app/shared/models/http-error-message.model';

export enum ColumnAction {
  AddColumn = '[column] ADD_COLUMN',
  AddColumnSuccess = '[column] ADD_COLUMN_SUCCESS',
  DeleteColumn = '[column] DELETE_COLUMN',
  DeleteColumnSuccess = '[column] DELETE_COLUMN_SUCCESS',
  PutColumn = '[column] PUT_COLUMN',
  PutColumnSuccess = '[column] PUT_COLUMN_SUCCESS',
  DragColumn = '[column] DRAG_COLUMN',
  ColumnError = '[column] COLUMN_ERROR',
}

export namespace ColumnActions {
  export const addColumn = createAction(
    ColumnAction.AddColumn,
    props<{ boardID: string; column: IColumnRequest }>(),
  );
  export const addColumnSuccess = createAction(
    ColumnAction.AddColumnSuccess,
    props<{ boardID: string; column: IColumn }>(),
  );

  export const deleteColumn = createAction(
    ColumnAction.DeleteColumn,
    props<{ boardID: string; columnID: string }>(),
  );
  export const deleteColumnSuccess = createAction(
    ColumnAction.DeleteColumnSuccess,
    props<{ boardID: string; columnID: string }>(),
  );

  export const putColumn = createAction(
    ColumnAction.PutColumn,
    props<{ boardID: string; column: Partial<IColumn> }>(),
  );
  export const putColumnSuccess = createAction(
    ColumnAction.PutColumnSuccess,
    props<{ boardID: string; column: IColumn }>(),
  );
  export const dragColumn = createAction(
    ColumnAction.DragColumn,
    props<{ boardID: string; column: IColumn }>(),
  );
  export const columnError = createAction(
    ColumnAction.ColumnError,
    props<{
      data: { error: HttpErrorResponse; actionType: ColumnAction; messages: IHttpErrorMessage[] };
    }>(),
  );
}
