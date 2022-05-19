import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-board-delete',
  templateUrl: './button-board-delete.component.html',
  styleUrls: ['./button-board-delete.component.scss'],
})
export class ButtonBoardDeleteComponent {
  @Input() inputClass = '';
}
