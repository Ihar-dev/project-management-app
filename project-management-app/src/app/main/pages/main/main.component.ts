import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BoardsModel, BoardModel, MOCK_BOARDS } from '../../models/mock-boards.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public boards: BoardsModel = MOCK_BOARDS;

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
  }

  public boardRout(event: Event, board: BoardModel): void {
    if (event.target === event.currentTarget) this.router.navigate([`/board/${board.id}`]);
  }

}
