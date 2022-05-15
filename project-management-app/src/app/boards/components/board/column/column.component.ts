import { Component, Input, OnInit } from '@angular/core';

import { IColumn } from 'src/app/shared/models/column.model';
import { BoardHandlingService } from '../../../../main/services/board-handling.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input() column: IColumn | null = null;
  @Input() public boardID = '';
  public columnID = '';
  public columnTitle = '';

  editMode: boolean = false;

  constructor(public readonly boardHandlingService: BoardHandlingService) {
      this.boardHandlingService = boardHandlingService;
  }

  ngOnInit(): void {
    if (this.column?.id) this.columnID = this.column.id;
    if (this.column?.title) this.columnTitle = this.column.title;
  }

  onClickTitle(): void {
    this.setEditMode(true);
  }

  onSubmitEditing(value: string): void {
    if (this.column) this.column.title = value;
    this.setEditMode(false);
  }

  onCancelEditing(): void {
    this.setEditMode(false);
  }

  setEditMode(value: boolean): void {
    this.editMode = value;
  }
}
