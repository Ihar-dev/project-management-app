import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { BoardModel } from '../../models/mock-boards.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() public board: BoardModel | null = null;

  constructor(private readonly router: Router) {}

  public boardRout(event: Event): void {
    if (event.target === event.currentTarget) this.router.navigate([`/board/${this.board?.id}`]);
  }

}
