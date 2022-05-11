import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { isAuth } from 'src/app/store/selectors/auth.selector';
import { StoreState } from 'src/app/store/store.model';

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

  isAuth$ = this.store.select(isAuth);

  constructor(private store: Store<StoreState>) {}

  toggleLocalization(): void {
    this.localized = this.localized === Localized.eng ? Localized.ru : Localized.eng;
  }
}
