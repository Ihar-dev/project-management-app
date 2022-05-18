import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-board-create',
  templateUrl: './button-board-create.component.html',
  styleUrls: ['./button-board-create.component.scss'],
})
export class ButtonBoardCreateComponent {
  @Input() text: string = '';
}
