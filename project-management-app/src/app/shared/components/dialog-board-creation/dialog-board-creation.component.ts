import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { BoardActions } from 'src/app/store/actions/board.action';

const DEFAULT_TITLE = 'Very efficient board';

const DEFAULT_ALERT = 'The board title should not be blank';

@Component({
  selector: 'app-dialog-board-creation',
  templateUrl: './dialog-board-creation.component.html',
  styleUrls: ['./dialog-board-creation.component.scss'],
})
export class DialogBoardCreationComponent {
  title: FormControl = this.formBuilder.control(DEFAULT_TITLE, [Validators.required]);

  alert = DEFAULT_ALERT;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<DialogBoardCreationComponent>,
    private store: Store,
  ) {}

  createBoard(): void {
    if (this.title.valid) {
      this.store.dispatch(
        BoardActions.addBoard({
          board: { title: this.title.value },
        }),
      );
      this.dialogRef.close();
    }
  }
}
