import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';

import { LocalStorageService } from 'src/app/core/services/localstorage.service';

import { TUserData } from '../models/register-data.model';
import { User, UserDataResponse } from '../models/user.model';
import { Url, USER_TOKEN_KEY } from '../constants';
import { TSigninData } from '../models/login-data.model';
import { TTokenResponse } from '../models/token-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly signUpUrl = Url.SIGN_UP;

  private readonly signInUrl = Url.SIGN_IN;

  private readonly usersUrl = Url.USERS;

  constructor(
    private http: HttpClient,
    private lsService: LocalStorageService,
    private router: Router,
  ) {}

  signUp(data: TUserData): Observable<TUserData> {
    return this.http
      .post<UserDataResponse>(this.signUpUrl, JSON.stringify(data))
      .pipe(map(() => data));
  }

  login(data: TSigninData): Observable<User | null> {
    return this.signIn(data).pipe(
      map(({ token }) => {
        this.lsService.setItem(USER_TOKEN_KEY, token);
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

  private navigate(...paths: string[]): void {
    this.router.navigate(paths, { replaceUrl: true });
  }
}
