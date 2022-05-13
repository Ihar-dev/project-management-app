import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { IBoard } from '../../shared/models/board.model';
import { BoardSelectors } from '../../store/selectors/board.selector';

@Injectable({
  providedIn: 'root'
})
export class BoardHandlingService {
  private boards$: Observable < IBoard[] >;
  public board$ = new Subject < IBoard >();
  public board: IBoard = {
    id: '',
    title: '',
    description: '',
    columns: [],
  };

  constructor(private store: Store) {
    this.boards$ = this.store.select(BoardSelectors.selectBoards);
    this.boards$.subscribe((boards: IBoard[]) => {
      boards.forEach(board => {
        if (board.id === this.board.id) {
          this.board = board;
          this.board$.next(this.board);
        }
      });
    });
  }

  public setBoard(board: IBoard): void {
    this.board = board;
  }

}
