import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IBoard } from '../../shared/models/board.model';

@Injectable({
  providedIn: 'root'
})
export class TaskSearchService {
  public searchResults$ = new Subject < string[] >();
  public boards: IBoard[] = [];

  public filter(boards: IBoard[], dataForSearch: string): void {
    const results: string[] = [];
    const re = new RegExp(dataForSearch, 'i');
    boards.forEach(board => {
      if (board.columns) {
        board.columns.forEach(column => {
          if (column.tasks) {
            column.tasks.forEach(task => {
              if (task.title.match(re)) {
                results.push(`Board: "${board.title}", column: "${column.title}", task title found: "${task.title}"`);
              }
              if (task.description.match(re)) {
                results.push(`Board: "${board.title}", column: "${column.title}", task: "${task.title}", task description found: "${task.description}"`);
              }
            });
          }
        });
      }
    });
    this.searchResults$.next(results);
  }
}
