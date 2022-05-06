import { Component, Input } from '@angular/core';

import { BoardModel } from '../../models/mock-boards.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() public board: BoardModel | null = null;

}
