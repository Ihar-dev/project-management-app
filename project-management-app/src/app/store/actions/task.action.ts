import { createAction, props } from '@ngrx/store';
import { ITaskRequest } from 'src/app/shared/models/task-request.model';
import { ITask } from 'src/app/shared/models/task.model';

enum TaskAction {
  AddTask = '[Task] ADD_TASK',
  AddTaskSuccess = '[Task] ADD_TASK_SUCCESS',
  DeleteTask = '[Task] DELETE_TASK',
  DeleteTaskSuccess = '[Task] DELETE_TASK_SUCCESS',
  PutTask = '[Task] PUT_TASK',
  PutTaskSuccess = '[column] PUT_TASK_SUCCESS',
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

  export const DeleteTask = createAction(
    TaskAction.DeleteTask,
    props<{ boardID: string; columnID: string; taskID: string }>(),
  );
  export const DeleteTaskSuccess = createAction(
    TaskAction.DeleteTaskSuccess,
    props<{ boardID: string; columnID: string; taskID: string }>(),
  );

  export const PutTask = createAction(
    TaskAction.PutTask,
    props<{ boardID: string; columnID: string; taskID: string; task: ITaskRequest }>(),
  );
  export const PutTaskSuccess = createAction(
    TaskAction.PutTaskSuccess,
    props<{ boardID: string; columnID: string; task: ITask }>(),
  );
}
