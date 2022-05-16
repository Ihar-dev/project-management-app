import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

import { IBoard } from 'src/app/shared/models/board.model';
import { IColumn } from 'src/app/shared/models/column.model';
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
  public id = '';
  readonly title = TITLE_DEFAULT;

  board: IBoard | null = null;

  constructor(private location: Location, public readonly boardHandlingService: BoardHandlingService,
  private readonly router: Router, public readonly dragDropService: DragDropService) {}

  ngOnInit() {
    this.boardSubs = this.boardHandlingService.board$.subscribe((board: IBoard) => {
      this.board = board;
      this.id = board.id;
    });
    const { url } = this.router;
    const urlArr = url.split('/');
    const id = urlArr[urlArr.length - 1];
    this.boardHandlingService.setBoardId(id);
  }

  ngOnDestroy(): void {
    this.boardSubs.unsubscribe();
  }

  onClickBack(): void {
    this.location.back();
  }


  drop(event: CdkDragDrop<IColumn>) {
    if (this.board) this.dragDropService.moveColumn(event, this.id, this.board);
  }
}
