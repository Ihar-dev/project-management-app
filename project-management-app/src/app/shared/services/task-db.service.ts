import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITaskRequest } from '../models/task-request.model';
import { ITask } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskDbService {
  private readonly boardsUrl = 'boards';

  constructor(private http: HttpClient) {}

  addTask(boardID: string, columnID: string, task: Partial<ITaskRequest>): Observable<ITask> {
    return this.http.post<ITask>(this.getUrl(boardID, columnID), task);
  }

  deleteTask(boardID: string, columnID: string, taskID: string): Observable<null> {
    return this.http.delete<null>(`${this.getUrl(boardID, columnID)}/${taskID}`);
  }

  updateTask(
    boardID: string,
    columnID: string,
    taskID: string,
    task: Omit<ITaskRequest, 'id'>,
  ): Observable<ITaskRequest> {
    return this.http.put<ITaskRequest>(`${this.getUrl(boardID, columnID)}/${taskID}`, task);
  }

  private getUrl(boardID: string, columnID: string): string {
    return `${this.boardsUrl}/${boardID}/columns/${columnID}/tasks`;
  }
}
