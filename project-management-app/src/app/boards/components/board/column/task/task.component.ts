import { Component, Input } from '@angular/core';
import { ITask } from 'src/app/boards/shared/models/task.model';

const TASK_DEFAULT = 'Task title';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task: ITask | null = null;

  readonly title = TASK_DEFAULT;
}
