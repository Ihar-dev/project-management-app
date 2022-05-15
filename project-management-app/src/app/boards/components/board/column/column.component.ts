import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IColumn } from 'src/app/shared/models/column.model';

import { MatDialog } from '@angular/material/dialog';
import { DialogCreationComponent, DialogInterface } from 'src/app/shared/components/dialog-creation/dialog-creation.component';
import { ColumnActions } from 'src/app/store/actions/column.action';
import { DialogConfirmationComponent, DialogData }
from '../../../../core/components/dialog-confirmation/dialog-confirmation.component';

const DELETE_THE_BOARD_QUESTION = 'Are you sure you would like to delete the column?';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column: IColumn | null = null;
  @Input() boardID = '';
  private columnID = '';

  editMode: boolean = false;

  constructor(private readonly dialog: MatDialog, private readonly store: Store) {}

  ngOnInit(): void {
    if (this.column?.id) this.columnID = this.column?.id;
  }

  onClickTitle(): void {
    this.setEditMode(true);
  }

  onSubmitEditing(value: string): void {
    if (this.column) {
      this.column.title = value;
    }
    this.setEditMode(false);
  }

  onCancelEditing(): void {
    this.setEditMode(false);
  }

  setEditMode(value: boolean): void {
    this.editMode = value;
  }

  openCreateTaskDialog(): void {
    this.dialog.open(DialogCreationComponent,
    { data: <DialogInterface> { type: 'task', columnID: this.columnID, boardID: this.boardID } });
  }

  public openDialogToDeleteTheColumn(): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: <DialogData>{
        h2: DELETE_THE_BOARD_QUESTION,
        p: `${this.column?.title}`,
      },
    });

    dialogRef.afterClosed().subscribe((result: Response) => {
      if (result) {
        this.deleteColumn(this.boardID, this.columnID);
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
}
