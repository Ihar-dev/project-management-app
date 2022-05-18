import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription, switchMap } from 'rxjs';

import { LocalStorageService } from 'src/app/core/services/localstorage.service';
import { Store } from '@ngrx/store';
import { selectIsAuth } from 'src/app/store/selectors/auth.selector';
import { logout } from 'src/app/store/actions/auth.action';

import { TUserData } from '../models/register-data.model';
import { User, UserDataResponse } from '../models/user.model';
import {
  TokenLimit,
  TOKEN_EXP_QUERY_KEY,
  TOKEN_EXP_QUERY_VALUE,
  Url,
  USER_TOKEN_KEY,
} from '../constants';
import { TSigninData } from '../models/login-data.model';
import { TTokenResponse } from '../models/token-response.model';
import { TQueryRoute } from '../models/query-route.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  private readonly signUpUrl = Url.SIGN_UP;

  private readonly signInUrl = Url.SIGN_IN;

  private readonly usersUrl = Url.USERS;

  private isAuth$ = this.store.select(selectIsAuth);

  private isAuthenticated = false;

  private subs = Subscription.EMPTY;

  private query: TQueryRoute = {};

  constructor(
    private http: HttpClient,
    private lsService: LocalStorageService,
    private router: Router,
    private store: Store,
  ) {
    this.subs = this.isAuth$.subscribe((val) => {
      this.isAuthenticated = val;
    });
  }

  signUp(data: TUserData): Observable<TUserData> {
    return this.http
      .post<UserDataResponse>(this.signUpUrl, JSON.stringify(data))
      .pipe(map(() => data));
  }

  login(data: TSigninData): Observable<User | null> {
    return this.signIn(data).pipe(
      map(({ token }) => {
        this.saveToken(token);
      }),
      switchMap(() => this.http.get<User[]>(this.usersUrl)),
      map((res) => {
        const userData = res.find((user) => data.login === user.login);
        if (userData) {
          this.navigate('main');
          return new User(userData);
        }

        this.navigate('auth', 'login');

        return null;
      }),
    );
  }

  signIn(data: TSigninData): Observable<TTokenResponse> {
    return this.http.post<TTokenResponse>(this.signInUrl, JSON.stringify(data));
  }

  signOut(): void {
    this.lsService.clear();
    this.navigate('welcome');
  }

  isUserAuthenticated(): boolean {
    this.query = {};

    if (!this.isAuthenticated) {
      return false;
    }
    if (this.isTokenActive()) {
      return true;
    }

    this.store.dispatch(logout());
    return false;
  }

  isTokenActive(): boolean {
    const tokenData = this.lsService.getItem<TTokenResponse>(USER_TOKEN_KEY);
    if (tokenData && tokenData.exp) {
      const isTokenActive = this.checkTokenExpiration(tokenData.exp);
      if (isTokenActive) {
        return true;
      }
      this.setTokenExpQueries();
    }

    return false;
  }

  private saveToken(token: string): void {
    const tokenExp: TTokenResponse = {
      token,
      exp: this.getTokenExpDate(TokenLimit.minutesThree),
    };
    this.lsService.setItem(USER_TOKEN_KEY, tokenExp);
  }

  private getTokenExpDate(limit: TokenLimit): number {
    return new Date().getTime() + limit;
  }

  private checkTokenExpiration(tokenExpDate: number): boolean {
    const currentDate = new Date().getTime();

    return currentDate - tokenExpDate < 0;
  }

  private setTokenExpQueries(): void {
    this.query = {
      [TOKEN_EXP_QUERY_KEY]: TOKEN_EXP_QUERY_VALUE,
    };
  }

  private navigate(...paths: string[]): void {
    this.router.navigate(paths, {
      replaceUrl: true,
      queryParams: { ...this.query },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
