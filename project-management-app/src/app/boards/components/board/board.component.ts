import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReplaySubject, takeUntil, Observable } from 'rxjs';
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
  public id = '';
  readonly title = TITLE_DEFAULT;
  public columns: IColumn[] = [];
  private destroyed$ = new ReplaySubject<boolean>(1);

  board: IBoard | null = null;
  private users$: Observable<User[]>;
  public users: User[] = [];

  constructor(
    private location: Location,
    public readonly boardHandlingService: BoardHandlingService,
    public readonly dragDropService: DragDropService,
    private route: ActivatedRoute,
    private readonly store: Store,
  ) {}

  ngOnInit() {
    this.getUsers();
    this.boardHandlingService.board$.pipe(takeUntil(this.destroyed$)).subscribe((board: IBoard) => {
      this.board = board;
      this.id = board.id;
      this.columns = board.columns;
    });
    this.users$ = this.store.select(UsersSelectors.selectUsers);
    this.users$.pipe(takeUntil(this.destroyed$)).subscribe((users: User[]) => {
      this.users = users;
    });

    this.route.data.pipe(takeUntil(this.destroyed$)).subscribe((data) => {
      this.boardHandlingService.setBoardId(data['board'].id);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
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
