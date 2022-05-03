import { Component } from '@angular/core';

enum Localized {
  eng = 'eng',
  ru = 'ru',
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  localized = Localized.eng;

  toggleLocalization(): void {
    this.localized = this.localized === Localized.eng ? Localized.ru : Localized.eng;
  }
}
