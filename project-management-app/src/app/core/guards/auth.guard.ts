import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectIsAuth } from 'src/app/store/selectors/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad, OnDestroy {
  isAuth$ = this.store.select(selectIsAuth);

  isAuthenticated = false;

  subs = Subscription.EMPTY;

  constructor(private router: Router, private store: Store) {
    this.subs = this.isAuth$.subscribe((val) => {
      this.isAuthenticated = val;
    });
  }

  canLoad(): boolean {
    return this.handleUserAuth();
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.handleUserAuth(route);
  }

  handleUserAuth(route?: ActivatedRouteSnapshot): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['welcome']);
    } else if (this.isAuthenticated && route?.url[0].path === 'welcome') {
      this.router.navigate(['main']);

      return false;
    }

    return this.isAuthenticated;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
