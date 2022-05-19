import { Component } from '@angular/core';
import { IBoard } from 'src/app/shared/models/board.model';
import { boardMock } from '../../shared/mocks/board.mock';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent {
  board: IBoard | null = boardMock;
}
