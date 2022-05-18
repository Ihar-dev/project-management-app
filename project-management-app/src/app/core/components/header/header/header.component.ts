import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/auth.action';
import { selectIsAuth } from 'src/app/store/selectors/auth.selector';

enum Localized {
  eng = 'eng',
  ru = 'ru',
}

const PAGE_WITH_TRANSPARENT_HEADER = ['/welcome'];

const PAGE_WITH_TRANSPARENT_HEADER_WITHOUT_AUTH = ['/auth/login', '/auth/signup'];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  localized = Localized.eng;

  isAuth$ = this.store.select(selectIsAuth);

  constructor(private store: Store, private router: Router) {}

  toggleLocalization(): void {
    this.localized = this.localized === Localized.eng ? Localized.ru : Localized.eng;
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

  get hideHeader(): boolean {
    return PAGE_WITH_TRANSPARENT_HEADER.some((url) => url === this.router.url);
  }

  get hideHeaderWithoutAuth(): boolean {
    return PAGE_WITH_TRANSPARENT_HEADER_WITHOUT_AUTH.some((url) => url === this.router.url);
  }
}
