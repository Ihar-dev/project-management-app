import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { TaskActions } from 'src/app/store/actions/task.action';
import { ColumnActions } from 'src/app/store/actions/column.action';
import { ITask } from 'src/app/shared/models/task.model';
import { IColumn } from 'src/app/shared/models/column.model';
import { ITaskRequest } from 'src/app/shared/models/task-request.model';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor(private readonly store: Store) {}

  public moveTask(event: CdkDragDrop<ITask[]>, boardID: string, column: IColumn) {
    const columnID = column.id;
    const newColumn = JSON.parse(JSON.stringify(column));
    if (newColumn?.tasks) moveItemInArray(newColumn.tasks, event.previousIndex, event.currentIndex);
    /* eslint-disable no-param-reassign */
    newColumn.tasks.map((task: ITask, index: number) => {
      task.order = index + 1;
      return task;
    });
    newColumn.tasks.forEach((task: ITask, index: number) => {
      if (task.id !== column.tasks[index].id) {
        const taskID = task.id;
        const newTask: Omit<ITaskRequest, 'id'> = {
          title: task.title,
          done: task.done,
          order: task.order,
          description: task.description,
          userId: task.userId,
          boardId: boardID,
          columnId: columnID,
        }
        this.updateTask(boardID, columnID, taskID, newTask);
      }
    });
  }

  private updateTask(
    boardID: string,
    columnID: string,
    taskID: string,
    task: Omit<ITaskRequest, 'id'>,
  ): void {
    this.store.dispatch(
      TaskActions.PutTask({
        boardID,
        columnID,
        taskID,
        task,
      }),
    );
  }

  public renameColumn(boardID: string, column: IColumn, title: string) {
    const newColumn = JSON.parse(JSON.stringify(column));
    newColumn.title = title;
    this.changeColumn(boardID, newColumn);
  }

  private changeColumn(boardID: string, column: IColumn): void {
    this.store.dispatch(
      ColumnActions.putColumn({
        boardID,
        column,
      }),
    );
  }
}
