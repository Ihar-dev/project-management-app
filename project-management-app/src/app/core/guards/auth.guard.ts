import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TOKEN_EXP_QUERY_KEY, TOKEN_EXP_QUERY_VALUE } from 'src/app/shared/constants';
import { TQueryRoute } from 'src/app/shared/models/query-route.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { selectIsAuth } from 'src/app/store/selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  query: TQueryRoute = {};

  isAuth$ = this.store.select(selectIsAuth);

  isActive: boolean;

  constructor(private router: Router, private authService: AuthService, private store: Store) {
    this.isAuth$.subscribe((res) => {
      this.isActive = res;
    });
  }

  canLoad(): boolean {
    if (this.isActive && !this.authService.isTokenActive()) {
      this.query = { [TOKEN_EXP_QUERY_KEY]: TOKEN_EXP_QUERY_VALUE };
    } else {
      this.query = {};
    }
    const isAuth = this.authService.isUserAuthenticated();

    if (!isAuth) {
      this.router.navigate(['welcome'], {
        queryParams: { ...this.query },
        replaceUrl: true,
        queryParamsHandling: 'merge',
      });
    }
    return isAuth;
  }
}
