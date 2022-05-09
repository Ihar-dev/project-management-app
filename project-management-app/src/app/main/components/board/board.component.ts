import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';

import { BoardActions } from 'src/app/store/actions/board.action';
import { DialogConfirmationComponent, DialogData }
from '../../../core/components/dialog-confirmation/dialog-confirmation.component';
import { BoardModel } from '../../models/mock-boards.model';

const DELETE_THE_BOARD_QUESTION = 'Are you sure you would like to delete the board?';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {
  @Input() public board: BoardModel | null = null;
  @Input() public mouseExisting = false;
  private id = '';
  public cardForm: FormGroup;
  public boardEditMode = false;

  constructor(private readonly router: Router, private readonly dialog: MatDialog, private readonly store: Store) {}

  ngOnInit(): void {
    this.cardForm = new FormGroup({
      userTitle: new FormControl(this.board?.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    });
    if (this.board?.id) this.id = this.board?.id;
  }

  public boardNameChange(boardTitleInputValue: string): void {
    if (!this.cardForm.controls['userTitle'].invalid && boardTitleInputValue) {
      this.boardEditMode = false;
      this.store.dispatch(BoardActions.putBoard({ id: this.id, board: { title: boardTitleInputValue } }));
    }
  }

  public boardRout(event: Event): void {
    if (event.target === event.currentTarget) this.router.navigate([`/boards/${this.board?.id}`]);
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
        console.log(`Delete board ${this.board?.title}`);
        //TODO method to delete the board
      }
    });
  }

  public get userTitle(): AbstractControl | null {
    return this.cardForm.get('userTitle');
  }
}
