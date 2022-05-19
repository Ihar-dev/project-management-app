import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { User } from 'src/app/shared/models/user.model';
import { UsersActions } from 'src/app/store/actions/users.action';
import { UsersSelectors } from 'src/app/store/selectors/users.selector';
import { BoardSelectors } from 'src/app/store/selectors/board.selector';
import { BoardActions } from 'src/app/store/actions/board.action';
import { TaskSearchService } from '../../services/task-search.service';
import { IBoard } from '../../../shared/models/board.model';
import { SearchResult } from '../../models/search-result.model';
import { BoardHandlingService } from '../../services/board-handling.service';

enum SearchTitles {
  Down = '&dArr; Search &dArr;',
  Up = '&uArr; Search &uArr;',
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public dataForSearch = '';
  private boardsSubs: Subscription;
  private searchResultsSubs: Subscription;
  private usersSubs: Subscription;
  public boards$: Observable<IBoard[]>;
  public boards: IBoard[] = [];
  public initialBoards: IBoard[] = [];
  public mouseExisting = false;
  public searchContainerDisplay = false;
  public searchDisplay = false;
  public searchResults: SearchResult[] = [];
  public SearchTitle: SearchTitles;
  private users$: Observable < User[] >;
  public users: User[] = [];

  constructor(
    private readonly router: Router,
    private store: Store,
    private readonly taskSearchService: TaskSearchService,
    public readonly boardHandlingService: BoardHandlingService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.getBoards();
    this.boards$ = this.store.select(BoardSelectors.selectBoards);
    this.boardsSubs = this.boards$.subscribe((boards: IBoard[]) => {
      if (this.initialBoards.length !== boards.length) {
        this.initialBoards = boards;
        this.boards = boards;
      } else this.boards = boards;
    });
    this.searchResultsSubs = this.taskSearchService.searchResults$.subscribe(
      (results: SearchResult[]) => {
        if (results.length) {
          this.searchResults = results;
          this.searchDisplay = true;
        } else this.searchDisplay = false;
      },
    );
    this.SearchTitle = SearchTitles.Down;
    this.users$ = this.store.select(UsersSelectors.selectUsers);
    this.usersSubs = this.users$.subscribe((users: User[]) => {
      this.users = users;
    });
  }

  public taskSearch(): void {
    if (this.dataForSearch) this.taskSearchService.filter(this.boards, this.dataForSearch, this.users);
    else this.searchDisplay = false;
  }

  public searchButtonClick(): void {
    if (this.searchContainerDisplay) {
      this.SearchTitle = SearchTitles.Down;
      this.searchContainerDisplay = false;
      this.searchDisplay = false;
      this.dataForSearch = '';
    } else {
      this.SearchTitle = SearchTitles.Up;
      this.searchContainerDisplay = true;
      this.boards.forEach((el: IBoard) => this.getBoardById(el.id));
    }
  }

  public openBoard(id: string): void {
    if (id && !this.boardHandlingService.boardEditMode) this.router.navigate([`/board/${id}`]);
  }

  private getBoardById(id: string): void {
    this.store.dispatch(BoardActions.getBoardById({ id }));
  }

  public getBoards(): void {
    this.store.dispatch(BoardActions.getBoards());
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
    this.usersSubs.unsubscribe();
  }

  private getUsers(): void {
    this.store.dispatch(UsersActions.getAll());
  }
}
