import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, Observable, of, take, tap } from 'rxjs';
import { IBoard } from 'src/app/shared/models/board.model';
import { IColumnRequest } from 'src/app/shared/models/column-request.model';
import { IColumn } from 'src/app/shared/models/column.model';
import { ITaskRequest } from 'src/app/shared/models/task-request.model';
import { ITask } from 'src/app/shared/models/task.model';
import { BoardActions } from 'src/app/store/actions/board.action';
import { ColumnActions } from 'src/app/store/actions/column.action';
import { TaskActions } from 'src/app/store/actions/task.action';
import { BoardSelectors } from 'src/app/store/selectors/board.selector';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  boardTitle = '';

  columnTitle = '';

  newBoardTitle = '';

  taskTitle = '';

  taskDescription = '';

  boards$: Observable<IBoard[]> = of([]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getBoards();

    this.boards$ = this.store.select(BoardSelectors.selectBoards);

    this.boards$
      .pipe(
        filter((boards) => boards.length > 0),
        take(1),
        tap((boards) =>
          boards.forEach((board) =>
            this.store.dispatch(BoardActions.getBoardById({ id: board.id })),
          ),
        ),
      )
      .subscribe();
  }

  addBoard(): void {
    this.store.dispatch(
      BoardActions.addBoard({
        board: { title: this.boardTitle },
      }),
    );
  }

  getBoards(): void {
    this.store.dispatch(BoardActions.getBoards());
  }

  deleteBoard(id: string): void {
    this.store.dispatch(BoardActions.deleteBoard({ id }));
  }

  getBoardById(id: string): void {
    this.store.dispatch(BoardActions.getBoardById({ id }));
  }

  renameBoard(id: string): void {
    this.store.dispatch(BoardActions.putBoard({ id, board: { title: this.newBoardTitle } }));
  }

  addColumn(boardID: string, column: IColumnRequest): void {
    this.store.dispatch(
      ColumnActions.addColumn({
        boardID,
        column,
      }),
    );
  }

  deleteColumn(boardID: string, columnID: string): void {
    this.store.dispatch(
      ColumnActions.deleteColumn({
        boardID,
        columnID,
      }),
    );
  }

  renameColumn(boardID: string, column: Partial<IColumn>): void {
    this.store.dispatch(
      ColumnActions.putColumn({
        boardID,
        column,
      }),
    );
  }

  addTask(boardID: string, columnID: string, task: Partial<ITaskRequest>): void {
    this.store.dispatch(
      TaskActions.AddTask({
        boardID,
        columnID,
        task,
      }),
    );
  }

  deleteTask(boardID: string, columnID: string, taskID: string): void {
    this.store.dispatch(
      TaskActions.DeleteTask({
        boardID,
        columnID,
        taskID,
      }),
    );
  }

  updateTask(
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

  findLastOrder(array: IColumn[] | ITask[] | undefined): number {
    if (!array || !array.length) {
      return 1;
    }
    return array[array.length - 1].order + 1;
  }
}
