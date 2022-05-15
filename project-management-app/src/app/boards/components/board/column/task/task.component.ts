import { Component, Input, OnInit } from '@angular/core';
import { ITask } from 'src/app/shared/models/task.model';
import { BoardHandlingService } from '../../../../../main/services/board-handling.service';

const TASK_DEFAULT = 'Task title';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input() task: ITask | null = null;
  @Input() public boardID = '';
  @Input() public columnID = '';
  public taskID = '';
  public taskTitle = '';

  readonly title = TASK_DEFAULT;

  constructor(public readonly boardHandlingService: BoardHandlingService) {
    this.boardHandlingService = boardHandlingService;
  }

  ngOnInit(): void {
    if (this.task?.id) this.taskID = this.task.id;
    if (this.task?.title) this.taskTitle = this.task.title;
  }
}
