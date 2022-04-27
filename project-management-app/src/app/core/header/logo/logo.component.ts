import { Component } from '@angular/core';

const LOGO = '../../../assets/icon/kanban.png';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
  get imgSource(): string {
    return LOGO;
  }
}
