import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { IColumn } from 'src/app/shared/models/column.model';
import { ITask } from 'src/app/shared/models/task.model';
import { BoardHandlingService } from '../../../../main/services/board-handling.service';
import { DragDropService } from '../../../services/drag-drop.service';

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
  public tasks: ITask[] = [];

  editMode: boolean = false;

  constructor(public readonly boardHandlingService: BoardHandlingService,
    public readonly dragDropService: DragDropService) {}

  public drop(event: CdkDragDrop<ITask[]>) {
    console.log(event.previousContainer === event.container);
    if (this.column) this.dragDropService.moveTask(event, this.boardID, this.column);
  }

  ngOnInit(): void {
    if (this.column?.id) this.columnID = this.column.id;
    if (this.column?.title) this.columnTitle = this.column.title;
    if (this.column?.tasks) this.tasks = this.column?.tasks;
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
