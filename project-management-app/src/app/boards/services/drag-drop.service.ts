import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { TaskActions } from 'src/app/store/actions/task.action';
import { ColumnActions } from 'src/app/store/actions/column.action';
import { ITask } from 'src/app/shared/models/task.model';
import { IColumn } from 'src/app/shared/models/column.model';
import { IBoard } from 'src/app/shared/models/board.model';
import { ITaskRequest } from 'src/app/shared/models/task-request.model';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {

  constructor(private readonly store: Store) {}

  public moveTask(event: CdkDragDrop < ITask[] > , boardID: string, column: IColumn): void {
    const columnID = column.id;
    const newColumn = JSON.parse(JSON.stringify(event.container.data));
    moveItemInArray(newColumn, event.previousIndex, event.currentIndex);
    /* eslint-disable no-param-reassign */
    newColumn.map((task: ITask, index: number) => {
      task.order = index + 1;
      return task;
    });
    newColumn.forEach((task: ITask, index: number) => {
      if (task.id !== column.tasks[index].id) {
        this.updateTask(boardID, columnID, task);
      }
    });
  }

  public moveTaskDifferentColumn(event: CdkDragDrop < ITask[] > , boardID: string, column: IColumn, columns: IColumn[]): void {
    const columnID = column.id;
    const newTargetColumn = JSON.parse(JSON.stringify(event.container.data));
    const newPreviousColumn = JSON.parse(JSON.stringify(event.previousContainer.data));
    transferArrayItem(
      newPreviousColumn,
      newTargetColumn,
      event.previousIndex,
      event.currentIndex,
    );
    const prevTask = newTargetColumn[event.currentIndex];
    newTargetColumn.map((task: ITask, index: number) => {
      task.order = index + 1;
      return task;
    });
    this.addTask(boardID, columnID, prevTask);
    newTargetColumn.forEach((task: ITask, index: number) => {
      if (event.currentIndex !== index) this.updateTask(boardID, columnID, task);
    });
    const taskToDelete: ITask = event.previousContainer.data[event.previousIndex];
    columns.forEach((prevColumn: IColumn) => {
      prevColumn.tasks.forEach((task: ITask) => {
        if (task.id === taskToDelete.id) this.deleteTask(boardID, prevColumn.id, taskToDelete.id);
      });
    });
  }

  private deleteTask(boardID: string, columnID: string, taskID: string): void {
    this.store.dispatch(
      TaskActions.DeleteTask({
        boardID,
        columnID,
        taskID,
      }),
    );
  }

  private updateTask(
    boardID: string,
    columnID: string,
    oldTask: ITask ,
  ): void {
    const taskID = oldTask.id;
    const task: Omit < ITaskRequest, 'id' > = {
      title: oldTask.title,
      done: oldTask.done,
      order: oldTask.order,
      description: oldTask.description,
      userId: oldTask.userId,
      boardId: boardID,
      columnId: columnID,
    }
    this.store.dispatch(
      TaskActions.PutTask({
        boardID,
        columnID,
        taskID,
        task,
      }),
    );
  }

  addTask(boardID: string, columnID: string, prevTask: ITask): void {
    const task: Partial < ITaskRequest > = {
      title: prevTask.title,
      done: prevTask.done,
      order: prevTask.order,
      description: prevTask.description,
      userId: prevTask.userId,
    };
    this.store.dispatch(
      TaskActions.AddTask({
        boardID,
        columnID,
        task,
      }),
    );
  }

  public moveColumn(event: CdkDragDrop < IColumn[] > , boardID: string, board: IBoard): void {
    const newBoard = JSON.parse(JSON.stringify(board));
    if (newBoard?.columns) moveItemInArray(newBoard.columns, event.previousIndex, event.currentIndex);
    let maxOrder = 0;
    let minOrder = Infinity;
    newBoard.columns.forEach((column: IColumn) => {
      if (maxOrder < column.order) maxOrder = column.order;
      if (minOrder > column.order) minOrder = column.order;
    });
    newBoard.columns.forEach((column: IColumn, index: number) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (minOrder > newBoard.columns.length) ? column.order = index + 1: column.order = ++maxOrder;
      this.updateColumn(boardID, column);
    });
  }

  private updateColumn(boardID: string, column: Partial < IColumn > ): void {
    this.store.dispatch(
      ColumnActions.putColumn({
        boardID,
        column,
      }),
    );
  }
}
