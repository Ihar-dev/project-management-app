import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { ColumnActions } from 'src/app/store/actions/column.action';
import { BoardActions } from 'src/app/store/actions/board.action';
import { DialogCreationComponent, DialogInterface } from 'src/app/shared/components/dialog-creation/dialog-creation.component';
import { DialogConfirmationComponent, DialogData }
from '../../core/components/dialog-confirmation/dialog-confirmation.component';
import { IBoard } from '../../shared/models/board.model';
import { BoardSelectors } from '../../store/selectors/board.selector';

enum DeleteQuestions {
  column = 'Are you sure you would like to delete the column?',
}

@Injectable({
  providedIn: 'root'
})
export class BoardHandlingService {
  private id = '';
  private boards$: Observable < IBoard[] >;
  public board$ = new Subject < IBoard >();
  public board: IBoard = {
    id: '',
    title: '',
    description: '',
    columns: [],
  };

  constructor(private readonly store: Store, private readonly dialog: MatDialog) {
    this.getBoards();
    this.boards$ = this.store.select(BoardSelectors.selectBoards);
    this.boards$.subscribe((boards: IBoard[]) => {
      boards.forEach(board => {
        if (board.id === this.id) {
          this.board = board;
          this.board$.next(this.board);
        }
      });
    });
  }

  public setBoardId(id: string): void {
    this.id = id;
    this.getBoardById(this.id);
  }

  private getBoardById(id: string): void {
    this.store.dispatch(BoardActions.getBoardById({ id }));
  }

  private getBoards(): void {
    this.store.dispatch(BoardActions.getBoards());
  }

  public openDialogToDelete(entity: string, title: string, boardID: string, columnID: string): void {
    let question: string;
    switch (entity) {
      case 'column':
        question = DeleteQuestions.column;
        break;
      default:
        question = '';
    }
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: <DialogData>{
        h2: question,
        p: title,
      },
    });

    dialogRef.afterClosed().subscribe((result: Response) => {
      if (result) {
        switch (entity) {
          case 'column':
            this.deleteColumn(boardID, columnID);
            break;
          default:
        }
      }
    });
  }

  deleteColumn(boardID: string, columnID: string): void {
    this.store.dispatch(
      ColumnActions.deleteColumn({
        boardID,
        columnID,
      }),
    );
  }

  openCreateColumnDialog(boardID: string): void {
    this.dialog.open(DialogCreationComponent, { data: <DialogInterface> { type: 'column', boardID } });
  }

  openCreateTaskDialog(boardID: string, columnID: string): void {
    this.dialog.open(DialogCreationComponent,
    { data: <DialogInterface> { type: 'task', boardID, columnID } });
  }
}
