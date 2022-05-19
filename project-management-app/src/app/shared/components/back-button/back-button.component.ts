import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

const DEFAULT_COLOR = 'primary';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
})
export class BackButtonComponent {
  @Input() btnColor: string = DEFAULT_COLOR;

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
