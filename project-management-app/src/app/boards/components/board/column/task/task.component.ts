import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectProfile } from 'src/app/store/selectors/auth.selector';
import { ITask } from 'src/app/shared/models/task.model';
import { User } from 'src/app/shared/models/user.model';
import { TaskAndUsers } from '../../../../models/task-and-users.model';
import { BoardHandlingService } from '../../../../../main/services/board-handling.service';

const TASK_DEFAULT = 'Task title';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit, OnDestroy {
  private profileSubs: Subscription;
  @Input() public users: User[] = [];
  @Input() task: ITask | null = null;
  @Input() public boardID = '';
  @Input() public columnID = '';
  public taskID = '';
  public taskTitle = '';
  public taskAndUsers: TaskAndUsers = {
    task: null,
    users: [],
  }
  public selectedUser: User;
  public selectUserMode = false;
  public userIcon = 'add';
  private profile$: Observable< User | null >;
  public profile: User = {
    name: '',
    id: '',
    login: ''
  };
  readonly title = TASK_DEFAULT;

  constructor(public readonly boardHandlingService: BoardHandlingService, private store: Store) {}

  ngOnInit(): void {
    if (this.task?.id) this.taskID = this.task.id;
    if (this.task?.title) this.taskTitle = this.task.title;
    this.taskAndUsers = {
      task: this.task,
      users: this.users,
    }
    this.profile$ = this.store.select(selectProfile);
    this.profileSubs = this.profile$.subscribe(profile => {
      if (profile) this.profile = profile;
    });
  }

  public userSelectToggle(): void {
    if (this.selectUserMode) {
      this.selectUserMode = false;
      this.userIcon = 'add';
    } else {
      this.selectUserMode = true;
      this.userIcon = 'clear';
    }
  }

  public setUser(selectedUserId: string): void {
    this.selectUserMode = false;
    this.userIcon = 'add';
    this.boardHandlingService.updateTask(this.boardID, this.columnID, this.task, selectedUserId);
  }

  ngOnDestroy(): void {
    this.profileSubs.unsubscribe();
  }
}
