import { Component } from '@angular/core';

const LOGO = '/project-management-app/project-management-app/dist/project-management-app/assets/icon/kanban-2.png';

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
