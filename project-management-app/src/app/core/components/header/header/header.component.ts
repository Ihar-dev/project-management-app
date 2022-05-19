import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/actions/auth.action';
import { selectIsAuth } from 'src/app/store/selectors/auth.selector';

enum Localized {
  en = 'en',
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
  localized = Localized.en;

  isAuth$ = this.store.select(selectIsAuth);

  constructor(private store: Store, private router: Router, private transloco: TranslocoService) {}

  toggleLocalization(): void {
    this.localized = this.localized === Localized.en ? Localized.ru : Localized.en;
    this.transloco.setActiveLang(this.localized);
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

  get hideHeader(): boolean {
    const { url } = this.router;
    return PAGE_WITH_TRANSPARENT_HEADER.some((urlPath) => url.includes(urlPath));
  }

  get hideHeaderWithoutAuth(): boolean {
    const { url } = this.router;
    return PAGE_WITH_TRANSPARENT_HEADER_WITHOUT_AUTH.some((urlPath) => url.includes(urlPath));
  }
}
