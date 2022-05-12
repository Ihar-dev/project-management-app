import { Component, Input } from '@angular/core';
import { IColumn } from 'src/app/shared/models/column.model';

const TITLE_DEFAULT = 'Column title';
@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent {
  @Input() column: IColumn | null = null;

  editMode: boolean = false;

  readonly title = TITLE_DEFAULT;

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
}
