import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BoardActions } from 'src/app/store/actions/board.action';

const DEFAULT_TITLE = 'New board';

const DEFAULT_ALERT = 'The name of the board must contain at least 3 characters';

@Component({
  selector: 'app-dialog-board-creation',
  templateUrl: './dialog-board-creation.component.html',
  styleUrls: ['./dialog-board-creation.component.scss'],
})
export class DialogBoardCreationComponent {
  boardTitle = DEFAULT_TITLE;

  alert = DEFAULT_ALERT;

  constructor(
    private dialogRef: MatDialogRef<DialogBoardCreationComponent>,
    private store: Store,
  ) {}

  createBoard(): void {
    if (this.boardTitleValid) {
      this.store.dispatch(
        BoardActions.addBoard({
          board: { title: this.boardTitle },
        }),
      );
      this.dialogRef.close();
    }
  }

  notAllowStartWithSpace(): void {
    if (this.boardTitle.trim() === '') {
      this.boardTitle = this.boardTitle.trim();
    }
  }

  clearInput(): void {
    this.boardTitle = '';
  }

  preventDefault(e: MouseEvent): void {
    e.preventDefault();
  }

  get boardTitleValid(): boolean {
    return this.boardTitle.length > 2;
  }
}
