import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { BoardSelectors } from 'src/app/store/selectors/board.selector';
import { BoardActions } from 'src/app/store/actions/board.action';
import { TaskSearchService } from '../../services/task-search.service';
import { IBoard } from '../../../shared/models/board.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  private readonly taskSearchService: TaskSearchService;
  public dataForSearch = '';
  private boardsSubs: Subscription;
  private searchResultsSubs: Subscription;
  public boards$: Observable < IBoard[] >;
  public boards: IBoard[] = [];
  public mouseExisting = false;
  public searchContainerDisplay = false;
  public searchDisplay = false;
  public searchResults: string[] = [];

  constructor(private readonly router: Router, private store: Store, taskSearchService: TaskSearchService) {
    this.taskSearchService = taskSearchService;
  }

  ngOnInit(): void {
    this.getBoards();
    this.boards$ = this.store.select(BoardSelectors.selectBoards);
    this.boardsSubs = this.boards$.subscribe((boards: IBoard[]) => {
      this.boards = boards;
    });
    this.searchResultsSubs = this.taskSearchService.searchResults$.subscribe((results: string[]) => {
      if (results.length) {
        this.searchResults = results;
        this.searchDisplay = true;
      } else this.searchDisplay = false;
    });
  }

  public taskSearch(): void {
    if (this.dataForSearch) this.taskSearchService.filter(this.boards, this.dataForSearch);
    else this.searchDisplay = false;
  }

  public searchButtonClick(): void {
    if (this.searchContainerDisplay) this.searchContainerDisplay = false;
    else {
      this.boards.forEach((el: IBoard) => this.getBoardById(el.id));
      this.searchContainerDisplay = true;
      // console.log(this.boards);
    }
  }

  public getBoardById(id: string): void {
    this.store.dispatch(BoardActions.getBoardById({ id }));
  }

  public getBoards(): void {
    this.store.dispatch(BoardActions.getBoards());
  }

  public boardRout(event: Event, board: IBoard): void {
    if (event.target === event.currentTarget) this.router.navigate([`/boards/${board.id}`]);
  }

  public mouseMove(): void {
    this.mouseExisting = true;
  }

  public mouseClick(): void {
    this.mouseExisting = false;
  }

  ngOnDestroy(): void {
    this.boardsSubs.unsubscribe();
    this.searchResultsSubs.unsubscribe();
  }
}
