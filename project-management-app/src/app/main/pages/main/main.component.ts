import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { BoardSelectors } from 'src/app/store/selectors/board.selector';
import { BoardActions } from 'src/app/store/actions/board.action';
import { TaskSearchService } from '../../services/task-search.service';
import { IBoard } from '../../../shared/models/board.model';
import { SearchResult } from '../../models/search-result.model';

enum SearchTitles {
  Down = '&dArr; Search &dArr;',
  Up = '&uArr; Search &uArr;',
}

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
  public initialBoards: IBoard[] = [];
  public mouseExisting = false;
  public searchContainerDisplay = false;
  public searchDisplay = false;
  public searchResults: SearchResult[] = [];
  public SearchTitle: SearchTitles;

  constructor(private readonly router: Router, private store: Store, taskSearchService: TaskSearchService) {
    this.taskSearchService = taskSearchService;
  }

  ngOnInit(): void {
    this.getBoards();
    this.boards$ = this.store.select(BoardSelectors.selectBoards);
    this.boardsSubs = this.boards$.subscribe((boards: IBoard[]) => {
      if (this.initialBoards.length !== boards.length) {
        this.initialBoards = boards;
        this.boards = boards;
      } else this.boards = boards;
    });
    this.searchResultsSubs = this.taskSearchService.searchResults$.subscribe((results: SearchResult[]) => {
      if (results.length) {
        this.searchResults = results;
        this.searchDisplay = true;
      } else this.searchDisplay = false;
    });
    this.SearchTitle = SearchTitles.Down;
  }

  public taskSearch(): void {
    if (this.dataForSearch) this.taskSearchService.filter(this.boards, this.dataForSearch);
    else this.searchDisplay = false;
  }

  public searchButtonClick(): void {
    if (this.searchContainerDisplay) {
      this.SearchTitle = SearchTitles.Down;
      this.searchContainerDisplay = false;
      this.searchDisplay = false;
      this.dataForSearch = '';
    }
    else {
      this.SearchTitle = SearchTitles.Up;
      this.searchContainerDisplay = true;
      this.boards.forEach((el: IBoard) => this.getBoardById(el.id));
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
