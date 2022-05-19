import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-member',
  templateUrl: './task-member.component.html',
  styleUrls: ['./task-member.component.scss'],
})
export class TaskMemberComponent {
  @Input() name: string = '';
}
