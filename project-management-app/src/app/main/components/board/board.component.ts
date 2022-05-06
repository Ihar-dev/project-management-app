import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmationComponent, DialogData }
from '../../../core/components/dialog-confirmation/dialog-confirmation.component';

import { BoardModel } from '../../models/mock-boards.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() public board: BoardModel | null = null;

  constructor(private readonly router: Router, private readonly dialog: MatDialog) {}

  public boardRout(event: Event): void {
    if (event.target === event.currentTarget) this.router.navigate([`/board/${this.board?.id}`]);
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: <DialogData>{
        h2: 'Are you sure you would like to delete the board?',
        p: `${this.board?.title}`,
      },
    });

    dialogRef.afterClosed().subscribe((result: Response) => {
      if (result) {
        console.log(`Delete board ${this.board?.title}`);
        //this.methodYouWantToUse() /* <--your method if confirmation accepted */
      }
    });
  }

}
