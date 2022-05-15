import { Component, Input } from '@angular/core';
import { IColumn } from 'src/app/shared/models/column.model';

import { MatDialog } from '@angular/material/dialog';
import { DialogCreationComponent, DialogInterface } from 'src/app/shared/components/dialog-creation/dialog-creation.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column: IColumn | null = null;
  @Input() boardID = '';

  editMode: boolean = false;

  constructor(private readonly dialog: MatDialog) {}

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
    { data: <DialogInterface> { type: 'task', columnID: this.column?.id, boardID: this.boardID } });
  }
}
