import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { BoardSelectors } from 'src/app/store/selectors/board.selector';
import { BoardActions } from 'src/app/store/actions/board.action';
import { BoardModel, BoardsModel } from '../../models/mock-boards.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public boards$: Observable <BoardsModel>;
  public mouseExisting = false;
  public searchContainerDisplay = false;

  constructor(private readonly router: Router, private store: Store) {}

  ngOnInit(): void {
    this.getBoards();
    this.boards$ = this.store.select(BoardSelectors.selectBoards);
  }

  public getBoards(): void {
    this.store.dispatch(BoardActions.getBoards());
  }

  public boardRout(event: Event, board: BoardModel): void {
    if (event.target === event.currentTarget) this.router.navigate([`/boards/${board.id}`]);
  }

  public mouseMove(): void {
    this.mouseExisting = true;
  }

  public mouseClick(): void {
    this.mouseExisting = false;
  }
}
