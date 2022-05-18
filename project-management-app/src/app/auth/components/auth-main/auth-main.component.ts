import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuth } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-auth-main',
  templateUrl: './auth-main.component.html',
  styleUrls: ['./auth-main.component.scss'],
})
export class AuthMainComponent {
  isAuth$ = this.store.select(selectIsAuth);

  constructor(private store: Store) {}
}
