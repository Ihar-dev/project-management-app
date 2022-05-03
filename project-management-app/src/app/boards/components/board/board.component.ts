import { Component, Input } from '@angular/core';
import { IBoard } from '../../shared/models/board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() title = 'Board name';

  @Input() board: IBoard | null = null;
}
