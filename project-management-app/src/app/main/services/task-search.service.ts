import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { IBoard } from '../../shared/models/board.model';
import { SearchResult } from '../models/search-result.model';

@Injectable({
  providedIn: 'root'
})
export class TaskSearchService {
  public searchResults$ = new Subject < SearchResult[] >();
  public boards: IBoard[] = [];

  public filter(boards: IBoard[], dataForSearch: string): void {
    const results: SearchResult[] = [];
    let result: SearchResult = {
      board: {
        title: '',
        id: '',
        description: '',
        columns: [],
      },
      text: '',
    };
    const re = new RegExp(dataForSearch, 'i');
    boards.forEach(board => {
      if (board.columns) {
        board.columns.forEach(column => {
          if (column.tasks) {
            column.tasks.forEach(task => {
              if (task.title.match(re)) {
                result = {
                  board,
                  text: `Board: "${board.title}", column: "${column.title}", task title found: "${task.title}"`,
                }
                results.push(result);
              }
              if (task.description.match(re)) {
                result = {
                  board,
                  text: `Board: "${board.title}", column: "${column.title}", task: "${task.title}", task description found: "${task.description}"`,
                }
                results.push(result);
              }
            });
          }
        });
      }
    });
    this.searchResults$.next(results);
  }
}
