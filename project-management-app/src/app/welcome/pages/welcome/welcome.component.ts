import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/shared/services/auth.service';
import { logout } from 'src/app/store/actions/auth.action';
import { selectIsAuth } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public pageActivation = false;

  isAuth$ = this.store.select(selectIsAuth);

  constructor(private store: Store, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isUserAuthenticated();
    setTimeout(() => {
      this.pageActivation = true;
    });
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }
}
