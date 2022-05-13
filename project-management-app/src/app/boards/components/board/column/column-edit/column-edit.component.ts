import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IColumn } from 'src/app/shared/models/column.model';

@Component({
  selector: 'app-column-edit',
  templateUrl: './column-edit.component.html',
  styleUrls: ['./column-edit.component.scss'],
})
export class ColumnEditComponent {
  @Input() column: IColumn | null = null;

  @Output() cancelEditing = new EventEmitter<void>();

  @Output() submitEditing = new EventEmitter<string>();

  onCancelEditing(): void {
    this.cancelEditing.emit();
  }

  onSubmitEditing(value: string): void {
    this.submitEditing.emit(value);
  }
}
