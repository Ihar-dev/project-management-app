import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { map, Observable, of, take, tap } from 'rxjs';
import { BoardActions } from 'src/app/store/actions/board.action';
import { ColumnActions } from 'src/app/store/actions/column.action';
import { TaskActions } from 'src/app/store/actions/task.action';
import { BoardSelectors } from 'src/app/store/selectors/board.selector';
import { IBoard } from '../../models/board.model';

const DEFAULT_USER_ID = 'd07f544c-99e0-4816-a331-5c87794e4270';

type ItemType = 'board' | 'column' | 'task';

export interface DialogInterface {
  type: ItemType;
  boardID?: string;
  columnID?: string;
}

enum DialogTitle {
  board = 'Enter a board name:',
  column = 'Enter a column name:',
  task = 'Enter a task name:',
}

enum DefaultTitle {
  board = 'New board',
  column = 'New column',
  task = 'New task',
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

  createEntity = {
    board: this.createBoard,
    column: this.createColumn,
    task: this.createTask,
  };

  constructor(
    private dialogRef: MatDialogRef<DialogCreationComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: DialogInterface,
  ) {}

  ngOnInit(): void {
    this.boards$ = this.store.select(BoardSelectors.selectBoards);
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
    return this.title.length >= MIN_TITLE_LENGTH;
  }

  get descriptionValid(): boolean {
    return this.description.length >= MIN_TITLE_LENGTH;
  }

  get boardID(): string {
    return this.data.boardID || '';
  }

  get columnID(): string {
    return this.data.columnID || '';
  }

  get needDescription(): boolean {
    return this.data.type !== 'column';
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
