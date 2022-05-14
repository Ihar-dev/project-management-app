import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBoard } from 'src/app/shared/models/board.model';

import { BoardHandlingService } from '../../../main/services/board-handling.service';

const TITLE_DEFAULT = 'Board title';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  private readonly boardHandlingService: BoardHandlingService;
  private boardSubs: Subscription;
  readonly title = TITLE_DEFAULT;

  board: IBoard | null = null;

  constructor(private location: Location, boardHandlingService: BoardHandlingService) {
    this.boardHandlingService = boardHandlingService;
  }

  ngOnInit() {
    this.boardSubs = this.boardHandlingService.board$.subscribe((board: IBoard) => {
      this.board = board;
    });
  }

  ngOnDestroy(): void {
    this.boardSubs.unsubscribe();
  }

  onClickBack(): void {
    this.location.back();
  }
}
