import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
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

  canActivate(): boolean {
    return this.handleUserAuth();
  }

  handleUserAuth(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['welcome']);
    }

    return this.isAuthenticated;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
