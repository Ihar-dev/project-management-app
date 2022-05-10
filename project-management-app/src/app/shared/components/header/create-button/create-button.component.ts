import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoardCreationComponent } from 'src/app/shared/components/dialog-board-creation/dialog-board-creation.component';

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss'],
})
export class CreateButtonComponent {
  constructor(private dialog: MatDialog) {}

  openCreateBoardDialog(): void {
    this.dialog.open(DialogBoardCreationComponent);
  }
}
