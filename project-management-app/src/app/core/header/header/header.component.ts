import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  localized = false;

  onChange(): void {
    /* Method for toggle localization */
    this.localized = !this.localized;
  }
}
