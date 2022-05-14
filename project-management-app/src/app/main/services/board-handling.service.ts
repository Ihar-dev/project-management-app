import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { BoardActions } from 'src/app/store/actions/board.action';
import { IBoard } from '../../shared/models/board.model';
import { BoardSelectors } from '../../store/selectors/board.selector';

@Injectable({
  providedIn: 'root'
})
export class BoardHandlingService {
  private id = '';
  private boards$: Observable < IBoard[] >;
  public board$ = new Subject < IBoard >();
  public board: IBoard = {
    id: '',
    title: '',
    description: '',
    columns: [],
  };

  constructor(private readonly store: Store) {
    this.getBoards();
    this.boards$ = this.store.select(BoardSelectors.selectBoards);
    this.boards$.subscribe((boards: IBoard[]) => {
      boards.forEach(board => {
        if (board.id === this.id) {
          this.board = board;
          this.board$.next(this.board);
        }
      });
    });
  }

  public setBoardId(id: string): void {
    this.id = id;
    this.getBoardById(this.id);
  }

  private getBoardById(id: string): void {
    this.store.dispatch(BoardActions.getBoardById({ id }));
  }

  private getBoards(): void {
    this.store.dispatch(BoardActions.getBoards());
  }
}
