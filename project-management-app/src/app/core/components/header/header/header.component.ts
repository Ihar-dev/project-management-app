import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/auth.action';
import { selectIsAuth } from 'src/app/store/selectors/auth.selector';

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

  isAuth$ = this.store.select(selectIsAuth);

  constructor(private store: Store) {}

  toggleLocalization(): void {
    this.localized = this.localized === Localized.eng ? Localized.ru : Localized.eng;
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
