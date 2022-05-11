import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';

import { LocalstorageService } from 'src/app/core/services/localstorage.service';

import { TUserData } from '../models/register-data.model';
import { User, UserDataResponce } from '../models/user.model';
import { USER_DATA_KEY, USER_TOKEN_KEY } from '../constants';
import { TSigninData } from '../models/login-data.model';
import { TTokenResponce } from '../models/token-responce.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly signUpUrl = 'signup';

  private readonly signInUrl = 'signin';

  private readonly usersUrl = 'users';

  constructor(
    private http: HttpClient,
    private lsService: LocalstorageService,
    private router: Router,
  ) {}

  signUp(data: TUserData): Observable<TUserData> {
    return this.http
      .post<UserDataResponce>(this.signUpUrl, JSON.stringify(data))
      .pipe(map(() => data));
  }

  signIn(data: TSigninData) {
    return this.http.post<TTokenResponce>(this.signInUrl, JSON.stringify(data)).pipe(
      map(({ token }) => {
        this.lsService.setItem(USER_TOKEN_KEY, token);
      }),
      switchMap(() => this.http.get<User[]>(this.usersUrl)),
      map((res) => {
        const userData = res.find((user) => data.login === user.login);
        if (userData) {
          const user = new User(userData);
          this.lsService.setItem(USER_DATA_KEY, user);
          this.navigate('');
          return user;
        }

        this.navigate('auth', 'login');

        return null;
      }),
    );
  }

  signOut(): void {
    this.lsService.clear();
    this.navigate('');
  }

  private navigate(...paths: string[]): void {
    this.router.navigate(paths);
  }
}
