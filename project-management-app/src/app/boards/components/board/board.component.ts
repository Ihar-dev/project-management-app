import { Component, Input } from '@angular/core';
import { IBoard } from '../../shared/models/board.model';

const TITLE_DEFAULT = 'Board title';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  readonly title = TITLE_DEFAULT;

  @Input() board: IBoard | null = null;
}
