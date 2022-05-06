import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { IBoard } from 'src/app/shared/models/board.model';
import { IColumn } from 'src/app/shared/models/column.model';
import { ITask } from 'src/app/shared/models/task.model';
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

  deleteBoard(id: string): void  {
    this.store.dispatch(BoardActions.deleteBoard({ id }));
  }

  getBoardById(id: string): void  {
    this.store.dispatch(BoardActions.getBoardsById({ id }));
  }

  renameBoard(id: string): void  {
    this.store.dispatch(BoardActions.putBoard({ id, board: { title: this.newBoardTitle } }));
  }


  addColumn(boardID: string, column:Partial<IColumn>): void {
    this.store.dispatch(
      ColumnActions.addColumn({
        boardID,
        column,
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

  renameColumn(boardID: string, column: Partial<IColumn>): void {
    this.store.dispatch(ColumnActions.putColumn({
      boardID,
      column
    }))
  }

  findLastOrder(array: IColumn[] | ITask[] | undefined): number {
    if(!array || !array.length) {
      return 1;
    }
    return array[array.length - 1].order + 1 || 1
  }
}
