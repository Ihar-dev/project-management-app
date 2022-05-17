import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs';
import { TaskDbService } from 'src/app/shared/services/task-db.service';
import { IHttpErrorMessage } from 'src/app/shared/models/http-error-message.model';
import { taskMessages } from 'src/app/shared/errors';
import { TaskAction, TaskActions } from '../actions/task.action';

@Injectable()
export class TaskEffects {
  errorMessages: IHttpErrorMessage[] = taskMessages;

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.AddTask),
      mergeMap((action) =>
        this.dbService.addTask(action.boardID, action.columnID, action.task).pipe(
          map((task) =>
            TaskActions.AddTaskSuccess({
              boardID: action.boardID,
              columnID: action.columnID,
              task,
            }),
          ),
          catchError((err) => [
            TaskActions.taskError({
              data: {
                error: err,
                actionType: TaskAction.AddTask,
                messages: this.errorMessages,
              },
            }),
          ]),
        ),
      ),
    ),
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.DeleteTask),
      mergeMap((action) =>
        this.dbService.deleteTask(action.boardID, action.columnID, action.taskID).pipe(
          map(() => TaskActions.DeleteTaskSuccess({ ...action })),
          catchError((err) => [
            TaskActions.taskError({
              data: {
                error: err,
                actionType: TaskAction.DeleteTask,
                messages: this.errorMessages,
              },
            }),
          ]),
        ),
      ),
    ),
  );

  putTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TaskActions.PutTask),
      mergeMap((action) =>
        this.dbService.updateTask(action.boardID, action.columnID, action.taskID, action.task).pipe(
          map((task) =>
            TaskActions.PutTaskSuccess({
              boardID: action.boardID,
              columnID: action.columnID,
              task,
            }),
          ),
          catchError((err) => [
            TaskActions.taskError({
              data: {
                error: err,
                actionType: TaskAction.PutTask,
                messages: this.errorMessages,
              },
            }),
          ]),
        ),
      ),
    ),
  );

  constructor(private actions$: Actions, private dbService: TaskDbService) {}
}
