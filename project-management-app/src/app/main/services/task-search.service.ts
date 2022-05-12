import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IBoard } from '../../shared/models/board.model';
import { IColumn } from '../../shared/models/column.model';
import { ITask } from '../../shared/models/task.model';
import { SearchResult } from '../models/search-result.model';

@Injectable({
  providedIn: 'root'
})
export class TaskSearchService {
  public searchResults$ = new Subject < SearchResult[] >();
  public boards: IBoard[] = [];
  private results: SearchResult[];

  public filter(boards: IBoard[], dataForSearch: string): void {
    this.results = [];
    const re = new RegExp(dataForSearch, 'i');
    boards.forEach(board => {
      if (board.columns) {
        board.columns.forEach(column => {
          if (column.tasks) {
            column.tasks.forEach(task => {
              this.titleSearch(board, column, task, re);
              this.descriptionSearch(board, column, task, re);
            });
          }
        });
      }
    });
    this.searchResults$.next(this.results);
  }

  private titleSearch(board: IBoard, column: IColumn, task: ITask, re: RegExp): void {
    if (task.title.match(re)) {
      const result: SearchResult = {
        board,
        text: `Board: "${board.title}", column: "${column.title}", task title found: "${task.title}"`,
      }
      this.results.push(result);

    }
  }

  private descriptionSearch(board: IBoard, column: IColumn, task: ITask, re: RegExp): void {
    if (task.description.match(re)) {
      const result: SearchResult = {
        board,
        text: `Board: "${board.title}", column: "${column.title}", task: "${task.title}", task description found: "${task.description}"`,
      }
      this.results.push(result);
    }
  }
}
