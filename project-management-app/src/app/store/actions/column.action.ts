import { createAction, props } from '@ngrx/store';
import { IColumn } from 'src/app/shared/models/column.model';

enum ColumnAction {
  AddColumn = '[column] ADD_COLUMN',
  AddColumnSuccess = '[column] ADD_COLUMN_SUCCESS',
  DeleteColumn = '[column] DELETE_COLUMN',
  DeleteColumnSuccess = '[column] DELETE_COLUMN_SUCCESS',
}

export namespace ColumnActions {
  export const addColumn = createAction(
    ColumnAction.AddColumn,
    props<{ boardID: string; column: Partial<IColumn> }>(),
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
}
