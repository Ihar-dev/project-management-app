import { Component, Input } from '@angular/core';
import { ITask } from 'src/app/boards/shared/models/task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {
  @Input() task: ITask | null = null;
}
