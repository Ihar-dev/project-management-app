import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { BoardActions } from 'src/app/store/actions/board.action';
import { DialogConfirmationComponent, DialogData }
from '../../../core/components/dialog-confirmation/dialog-confirmation.component';
import { IBoard } from '../../../shared/models/board.model';

const DELETE_THE_BOARD_QUESTION = 'Are you sure you would like to delete the board?';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  @Input() public board: IBoard | null = null;
  @Input() public mouseExisting = false;
  public editMode = false;
  public boardName = '';
  public boardDescription = '';
  private id = '';
  public cardForm: FormGroup;
  public boardEditMode = false;

  constructor(private readonly dialog: MatDialog,
  private readonly store: Store) {}

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      userTitle: new FormControl(this.board?.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      userDescription: new FormControl(this.board?.description, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(130),
      ]),
    });
    if (this.board?.id) this.id = this.board?.id;
    if (this.board?.title) this.boardName = this.board?.title;
    if (this.board?.description) this.boardDescription = this.board?.description;
  }

  public boardNameChange(event: MouseEvent, boardTitleInputValue: string, boardDescriptionInputValue: string): void {
    event.stopImmediatePropagation();
    this.editMode = false;
    if (!this.cardForm.controls['userTitle'].invalid && boardTitleInputValue &&
    !this.cardForm.controls['userDescription'].invalid && boardDescriptionInputValue &&
    boardTitleInputValue.trim().length > 2 &&
    boardDescriptionInputValue.trim().length > 2
    ) {
      this.boardName = boardTitleInputValue;
      this.boardDescription = boardDescriptionInputValue;
      this.boardEditMode = false;
      this.store.dispatch(BoardActions.putBoard({ id: this.id, board: { title: boardTitleInputValue,
      description: boardDescriptionInputValue } }));
    }
  }

  public openDialogToDeleteTheBoard(): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: <DialogData>{
        h2: DELETE_THE_BOARD_QUESTION,
        p: `${this.board?.title}`,
      },
    });

    dialogRef.afterClosed().subscribe((result: Response) => {
      if (result) {
        this.deleteBoard();
      }
    });
  }

  private deleteBoard(): void {
    this.store.dispatch(BoardActions.deleteBoard({ id: this.id }));
  }

  public get userTitle(): AbstractControl | null {
    return this.cardForm.get('userTitle');
  }

  public get userDescription(): AbstractControl | null {
    return this.cardForm.get('userDescription');
  }

  public mouseMove(): void {
    this.board?.title.trim();
  }
}
