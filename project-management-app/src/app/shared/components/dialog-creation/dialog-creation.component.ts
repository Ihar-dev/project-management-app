import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslocoService } from '@ngneat/transloco';
import { EMPTY, map, Observable, of, take, tap } from 'rxjs';
import { BoardActions } from 'src/app/store/actions/board.action';
import { ColumnActions } from 'src/app/store/actions/column.action';
import { TaskActions } from 'src/app/store/actions/task.action';
import { BoardSelectors } from 'src/app/store/selectors/board.selector';
import { selectProfile } from 'src/app/store/selectors/auth.selector';
import { IBoard } from '../../models/board.model';
import { IColumn } from '../../models/column.model';
import { ITask } from '../../models/task.model';
import { User } from '../../models/user.model';

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
  board = 'dialog.title.board',
  column = 'dialog.title.column',
  task = 'dialog.title.task',
  columnEdit = 'dialog.title.columnEdit',
  taskEdit = 'dialog.title.taskEdit',
}

enum DefaultTitle {
  board = 'dialog.default.board',
  column = 'dialog.default.column',
  task = 'dialog.default.task',
  columnEdit = '',
  taskEdit = '',
}

const MIN_TITLE_LENGTH = 3;

const DEFAULT_ALERT = {
  TITLE: `Title must contain at least ${MIN_TITLE_LENGTH} characters`,
  DESCRIPTION: `Description must contain at least  ${MIN_TITLE_LENGTH} characters`,
  TitleTransloco: 'title-alert',
  DescriptionTransloco: 'description-alert',
};

@Component({
  selector: 'app-dialog-creation',
  templateUrl: './dialog-creation.component.html',
  styleUrls: ['./dialog-creation.component.scss'],
})
export class DialogCreationComponent implements OnInit {
  private boards$: Observable<IBoard[]> = of([]);

  private currentUser$: Observable<User | null> = EMPTY;

  title: string = this.transloco.translate(DefaultTitle[this.data.type]);

  description = '';

  titleAlert = DEFAULT_ALERT.TitleTransloco;

  descriptionAlert = DEFAULT_ALERT.DescriptionTransloco;

  minLength = MIN_TITLE_LENGTH;

  dialogTitle = this.transloco.translate(DialogTitle[this.data.type]);

  currentColumn!: IColumn;

  currentTask!: ITask;

  private currentUserID = '';

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
    private transloco: TranslocoService,
    @Inject(MAT_DIALOG_DATA) public data: DialogInterface,
  ) {}

  ngOnInit(): void {
    this.boards$ = this.store.select(BoardSelectors.selectBoards);
    this.currentUser$ = this.store.select(selectProfile);
    this.currentUser$
      .pipe(
        take(1),
        tap((user) => {
          this.currentUserID = user?.id || '';
        }),
      )
      .subscribe();

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
            userId: this.currentUserID,
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
