import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, of } from 'rxjs';
import { IBoard } from 'src/app/shared/models/board.model';
import { BoardActions } from 'src/app/store/actions/board.action';
import { ColumnActions } from 'src/app/store/actions/column.action';
import { BoardSelectors } from 'src/app/store/selectors/board.selector';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
  boardTitle = '';

  columnTitle = '';

  newBoardTitle = '';

  boards$: Observable<IBoard[]> = of([]);

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.getBoards();

    this.boards$ = this.store.select(BoardSelectors.selectBoards);
  }

  addBoard(): void {
    this.store.dispatch(
      BoardActions.addBoard({
        board: { title: this.boardTitle },
      }),
    );
  }

  getBoards(): void {
    this.store.dispatch(BoardActions.getBoards());
  }

  deleteBoard(id: string) {
    this.store.dispatch(BoardActions.deleteBoard({ id }));
  }

  getBoardById(id: string) {
    this.store.dispatch(BoardActions.getBoardsById({ id }));
  }

  renameBoard(id: string) {
    this.store.dispatch(BoardActions.putBoard({ id, board: { title: this.newBoardTitle } }));
  }

  get checkBoardsLength(): Observable<boolean> {
    return this.boards$.pipe(map((array) => array.length > 0));
  }

  addColumn(boardID: string, columnsLength: number = 0): void {
    const order = columnsLength + 1;
    this.store.dispatch(
      ColumnActions.addColumn({
        boardID,
        column: { title: this.columnTitle, order },
      }),
    );
  }

  deleteColumn(boardID: string, columnID: string): void {
    this.store.dispatch(
      ColumnActions.deleteColumn({
        boardID,
        columnID,
      }),
    );
  }
}
