import { Component, EventEmitter, Input, Output } from '@angular/core';

import { IColumn } from 'src/app/shared/models/column.model';
import { BoardHandlingService } from '../../../../../main/services/board-handling.service';

@Component({
  selector: 'app-column-edit',
  templateUrl: './column-edit.component.html',
  styleUrls: ['./column-edit.component.scss'],
})
export class ColumnEditComponent {
  @Input() column: IColumn | null = null;
  @Input() public boardID = '';

  @Output() cancelEditing = new EventEmitter<void>();

  @Output() submitEditing = new EventEmitter<string>();

  constructor(public readonly boardHandlingService: BoardHandlingService) {}

  onCancelEditing(): void {
    this.cancelEditing.emit();
  }

  onSubmitEditing(value: string): void {
    if (this.column) this.boardHandlingService.renameColumn(this.boardID, this.column, value);
    // this.submitEditing.emit(value);
  }
}
