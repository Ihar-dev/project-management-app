import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

enum Localized {
  en = 'en',
  ru = 'ru',
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  localized = Localized.en;

  constructor(private transloco: TranslocoService) {}

  toggleLocalization(): void {
    this.localized = this.localized === Localized.en ? Localized.ru : Localized.en;
    this.transloco.setActiveLang(this.localized);
  }
}
