import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of, take, tap } from 'rxjs';
import { BoardActions } from 'src/app/store/actions/board.action';
import { ColumnActions } from 'src/app/store/actions/column.action';
import { TaskActions } from 'src/app/store/actions/task.action';
import { BoardSelectors } from 'src/app/store/selectors/board.selector';
import { IBoard } from '../../models/board.model';
import { IColumn } from '../../models/column.model';
import { ITask } from '../../models/task.model';

const DEFAULT_USER_ID = 'd07f544c-99e0-4816-a331-5c87794e4270';

const MAIN_PAGE = '/main';

type ItemType = 'board' | 'column' | 'task' | 'columnEdit' | 'taskEdit';

export interface DialogInterface {
  type: ItemType;
  boardID?: string;
  columnID?: string;
  column: IColumn;
  task: ITask;
}

enum DialogTitle {
  board = 'Enter a board name:',
  column = 'Enter a column name:',
  task = 'Enter a task name:',
  columnEdit = 'Edit a column name:',
  taskEdit = 'Edit a task name:',
}

enum DefaultTitle {
  board = 'New board',
  column = 'New column',
  task = 'New task',
  columnEdit = '',
  taskEdit = '',
}

const MIN_TITLE_LENGTH = 3;

const DEFAULT_ALERT = {
  TITLE: `Title must contain at least ${MIN_TITLE_LENGTH} characters`,
  DESCRIPTION: `Description must contain at least  ${MIN_TITLE_LENGTH} characters`,
};

@Component({
  selector: 'app-dialog-creation',
  templateUrl: './dialog-creation.component.html',
  styleUrls: ['./dialog-creation.component.scss'],
})
export class DialogCreationComponent implements OnInit {
  boards$: Observable<IBoard[]> = of([]);

  title: string = DefaultTitle[this.data.type];

  description = '';

  titleAlert = DEFAULT_ALERT.TITLE;

  descriptionAlert = DEFAULT_ALERT.DESCRIPTION;

  dialogTitle = DialogTitle[this.data.type];

  currentColumn!: IColumn;

  currentTask!: ITask;

  createEntity = {
    board: this.createBoard,
    column: this.createColumn,
    task: this.createTask,
    columnEdit: this.editColumn,
    taskEdit: this.editTask,
  };

  constructor(
    private dialogRef: MatDialogRef<DialogCreationComponent>,
    private store: Store,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogInterface,
  ) {}

  ngOnInit(): void {
    this.boards$ = this.store.select(BoardSelectors.selectBoards);
    if (this.data.column) {
      this.currentColumn = this.data.column;
      this.title = this.currentColumn.title;
    }
    if (this.data.task) {
      this.currentTask = this.data.task;
      this.title = this.currentTask.title;
      this.description = this.currentTask.description;
    }
  }

  create(): void {
    this.createEntity[this.data.type].call(this);
  }

  createBoard(): void {
    if (this.titleValid && this.descriptionValid) {
      this.store.dispatch(
        BoardActions.addBoard({
          board: { title: this.title, description: this.description },
        }),
      );
      this.dialogRef.close();
      this.router.navigateByUrl(MAIN_PAGE);
    }
  }

  createColumn(): void {
    if (this.titleValid) {
      this.store.dispatch(
        ColumnActions.addColumn({
          boardID: this.boardID,
          column: { title: this.title, order: this.takeNextColumnOrder },
        }),
      );
      this.dialogRef.close();
    }
  }

  createTask(): void {
    if (this.titleValid && this.descriptionValid) {
      this.store.dispatch(
        TaskActions.AddTask({
          boardID: this.boardID,
          columnID: this.columnID,
          task: {
            title: this.title,
            order: this.takeNextTaskOrder,
            description: this.description,
            done: false,
            userId: DEFAULT_USER_ID,
          },
        }),
      );
      this.dialogRef.close();
    }
  }

  editColumn(): void {
    if (this.titleValid) {
      this.store.dispatch(
        ColumnActions.putColumn({
          boardID: this.boardID,
          column: { ...this.currentColumn, title: this.title },
        }),
      );
      this.dialogRef.close();
    }
  }

  editTask(): void {
    if (this.titleValid && this.descriptionValid) {
      this.store.dispatch(
        TaskActions.PutTask({
          boardID: this.boardID,
          columnID: this.columnID,
          taskID: this.currentTask.id,
          task: {
            title: this.title,
            description: this.description,
            boardId: this.boardID,
            columnId: this.columnID,
            done: this.currentTask.done,
            order: this.currentTask.order,
            userId: this.currentTask.userId,
          },
        }),
      );
      this.dialogRef.close();
    }
  }

  notAllowStartWithSpace(): void {
    if (this.title.trim() === '') {
      this.clearInput();
    }
    if (this.description.trim() === '') {
      this.clearDescription();
    }
  }

  clearInput(): void {
    this.title = '';
  }

  clearDescription(): void {
    this.description = '';
  }

  preventDefault(e: MouseEvent): void {
    e.preventDefault();
  }

  get titleValid(): boolean {
    return this.title.trim().length >= MIN_TITLE_LENGTH;
  }

  get descriptionValid(): boolean {
    return this.description.trim().length >= MIN_TITLE_LENGTH;
  }

  get boardID(): string {
    return this.data.boardID || '';
  }

  get columnID(): string {
    return this.data.columnID || '';
  }

  get needDescription(): boolean {
    return this.data.type !== 'column' && this.data.type !== 'columnEdit';
  }

  get takeNextColumnOrder(): number {
    let nextOrder = 1;
    this.store.dispatch(BoardActions.getBoardById({ id: this.boardID }));
    this.boards$
      .pipe(
        take(1),
        map((boards) => boards.find((board) => board.id === this.boardID)?.columns),
        tap((columns) => {
          if (columns && columns.length) {
            nextOrder = columns[columns.length - 1].order + 1;
          }
        }),
      )
      .subscribe();
    return nextOrder;
  }

  get takeNextTaskOrder(): number {
    let nextOrder = 1;
    this.store.dispatch(BoardActions.getBoardById({ id: this.boardID }));
    this.boards$
      .pipe(
        take(1),
        map((boards) => boards.find((board) => board.id === this.boardID)?.columns),
        map((columns) => columns?.find((column) => column.id === this.columnID)?.tasks),
        tap((tasks) => {
          if (tasks && tasks.length) {
            nextOrder = tasks[tasks.length - 1].order + 1;
          }
        }),
      )
      .subscribe();
    return nextOrder;
  }
}
