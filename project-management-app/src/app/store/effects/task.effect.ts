import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs';
import { TaskDbService } from 'src/app/shared/services/task-db.service';
import { EffectsHandlerService } from 'src/app/shared/services/effects-handler.service';
import { TaskActions } from '../actions/task.action';

enum Operation {
  AddTask = 'Add task',
  DeleteTask = 'Delete task',
  PutTask = 'Put task',
}

@Injectable()
export class TaskEffects {
  addTask$ = createEffect(() => {
    return this.actions$.pipe(
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
          catchError(this.handler.handleError(Operation.AddTask)),
        ),
      ),
    );
  });

  deleteTask$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TaskActions.DeleteTask),
      mergeMap((action) =>
        this.dbService.deleteTask(action.boardID, action.columnID, action.taskID).pipe(
          map(() => TaskActions.DeleteTaskSuccess({ ...action })),
          catchError(this.handler.handleError(Operation.DeleteTask)),
        ),
      ),
    );
  });

  putTask$ = createEffect(() => {
    return this.actions$.pipe(
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
          catchError(this.handler.handleError(Operation.PutTask)),
        ),
      ),
    );
  });

  constructor(
    private actions$: Actions,
    private dbService: TaskDbService,
    private handler: EffectsHandlerService,
  ) {}
}
