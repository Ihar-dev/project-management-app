import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Store } from '@ngrx/store';

import { IBoard } from 'src/app/shared/models/board.model';
import { IColumn } from 'src/app/shared/models/column.model';
import { User } from 'src/app/shared/models/user.model';
import { UsersActions } from 'src/app/store/actions/users.action';
import { UsersSelectors } from 'src/app/store/selectors/users.selector';
import { BoardHandlingService } from '../../../main/services/board-handling.service';
import { DragDropService } from '../../services/drag-drop.service';

const TITLE_DEFAULT = 'Board title';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {

  private boardSubs: Subscription;
  private usersSubs: Subscription;
  public id = '';
  readonly title = TITLE_DEFAULT;
  public columns: IColumn[] = [];
  public board: IBoard | null = null;
  private users$: Observable < User[] >;
  public users: User[] = [];

  constructor(private location: Location, public readonly boardHandlingService: BoardHandlingService,
  private readonly router: Router, public readonly dragDropService: DragDropService,
  private readonly store: Store) {}

  ngOnInit() {
    this.getUsers();
    this.boardSubs = this.boardHandlingService.board$.subscribe((board: IBoard) => {
      this.board = board;
      this.id = board.id;
      this.columns = board.columns;
    });
    const { url } = this.router;
    const urlArr = url.split('/');
    const id = urlArr[urlArr.length - 1];
    this.boardHandlingService.setBoardId(id);
    this.users$ = this.store.select(UsersSelectors.selectUsers);
    this.usersSubs = this.users$.subscribe((users: User[]) => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    this.boardSubs.unsubscribe();
    this.usersSubs.unsubscribe();
  }

  onClickBack(): void {
    this.location.back();
  }

  private getUsers(): void {
    this.store.dispatch(UsersActions.getAll());
  }

  drop(event: CdkDragDrop<IColumn[]>) {
    if (this.board) this.dragDropService.moveColumn(event, this.id, this.board);
  }
}
