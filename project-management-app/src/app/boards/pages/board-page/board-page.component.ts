import { Component } from '@angular/core';
import { boardMock } from '../../shared/mocks/board.mock';
import { IBoard } from '../../shared/models/board.model';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent {
  board: IBoard | null = boardMock;
}
