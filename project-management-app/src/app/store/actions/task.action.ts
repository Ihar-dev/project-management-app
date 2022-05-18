import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { IHttpErrorMessage } from 'src/app/shared/models/http-error-message.model';
import { ITaskRequest } from 'src/app/shared/models/task-request.model';
import { ITask } from 'src/app/shared/models/task.model';

export enum TaskAction {
  AddTask = '[Task] ADD_TASK',
  DragAddTask = '[Task] DRAG_ADD_TASK',
  AddTaskSuccess = '[Task] ADD_TASK_SUCCESS',
  DeleteTask = '[Task] DELETE_TASK',
  DragDeleteTask = '[Task] DRAG_DELETE_TASK',
  DeleteTaskSuccess = '[Task] DELETE_TASK_SUCCESS',
  PutTask = '[Task] PUT_TASK',
  PutTaskSuccess = '[Task] PUT_TASK_SUCCESS',
  DragTask = '[Task] DRAG_TASK',
  TaskError = '[Task] TASK_ERROR',
}

export namespace TaskActions {
  export const AddTask = createAction(
    TaskAction.AddTask,
    props<{ boardID: string; columnID: string; task: Partial<ITaskRequest> }>(),
  );
  export const AddTaskSuccess = createAction(
    TaskAction.AddTaskSuccess,
    props<{ boardID: string; columnID: string; task: ITask }>(),
  );
  export const DragAddTask = createAction(
    TaskAction.DragAddTask,
    props<{ boardID: string; columnID: string; task: ITask; taskRequest: Partial<ITaskRequest> }>(),
  );

  export const DeleteTask = createAction(
    TaskAction.DeleteTask,
    props<{ boardID: string; columnID: string; taskID: string }>(),
  );
  export const DeleteTaskSuccess = createAction(
    TaskAction.DeleteTaskSuccess,
    props<{ boardID: string; columnID: string; taskID: string }>(),
  );
  export const DragDeleteTask = createAction(
    TaskAction.DragDeleteTask,
    props<{ boardID: string; columnID: string; taskID: string }>(),
  );

  export const PutTask = createAction(
    TaskAction.PutTask,
    props<{ boardID: string; columnID: string; taskID: string; task: Omit<ITaskRequest, 'id'> }>(),
  );
  export const PutTaskSuccess = createAction(
    TaskAction.PutTaskSuccess,
    props<{ boardID: string; columnID: string; task: ITaskRequest }>(),
  );
  export const DragTask = createAction(
    TaskAction.DragTask,
    props<{ boardID: string; columnID: string; taskID: string; task: Omit<ITaskRequest, 'id'> }>(),
  );
  export const taskError = createAction(
    TaskAction.TaskError,
    props<{
      data: { error: HttpErrorResponse; actionType: TaskAction; messages: IHttpErrorMessage[] };
    }>(),
  );
}
