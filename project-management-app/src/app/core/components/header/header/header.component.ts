import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/auth.action';
import { selectIsAuth } from 'src/app/store/selectors/auth.selector';

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

  isAuth$ = this.store.select(selectIsAuth);

  constructor(private store: Store, private transloco: TranslocoService) {}

  toggleLocalization(): void {
    this.localized = this.localized === Localized.en ? Localized.ru : Localized.en;
    this.transloco.setActiveLang(this.localized);
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
