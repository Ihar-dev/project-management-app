import {
  Injectable
} from '@angular/core';
import {
  Store
} from '@ngrx/store';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

import {
  TaskActions
} from 'src/app/store/actions/task.action';
import {
  ColumnActions
} from 'src/app/store/actions/column.action';
import {
  ITask
} from 'src/app/shared/models/task.model';
import {
  IColumn
} from 'src/app/shared/models/column.model';
import {
  IBoard
} from 'src/app/shared/models/board.model';
import {
  ITaskRequest
} from 'src/app/shared/models/task-request.model';

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
        const taskID = task.id;
        const newTask: Omit < ITaskRequest, 'id' > = {
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
    const newTask: Partial < ITaskRequest > = {
      title: prevTask.title,
      done: prevTask.done,
      order: prevTask.order,
      description: prevTask.description,
      userId: prevTask.userId,
    };
    this.addTask(boardID, columnID, newTask);
    newTargetColumn.map((task: ITask, index: number) => {
      task.order = index + 1;
      return task;
    });
    console.log(newTargetColumn);
    console.log(column.tasks);
    newTargetColumn.forEach((task: ITask, index: number) => {
      let hasItem = true;
      if (!column.tasks[index]) hasItem = false;
      if (hasItem) {
        if (task.id !== column.tasks[index].id) {
          console.log(task);
        }
      } else {
        console.log(index);
        console.log(task);
      }
    });
    console.log(columns);
  }

  addTask(boardID: string, columnID: string, task: Partial < ITaskRequest > ): void {
    this.store.dispatch(
      TaskActions.AddTask({
        boardID,
        columnID,
        task,
      }),
    );
  }

  private updateTask(
    boardID: string,
    columnID: string,
    taskID: string,
    task: Omit < ITaskRequest, 'id' > ,
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
