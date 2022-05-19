import { ITask } from 'src/app/shared/models/task.model';
import { User } from 'src/app/shared/models/user.model';

export type TaskAndUsers = {
  task: ITask | null,
  users: User[],
}
