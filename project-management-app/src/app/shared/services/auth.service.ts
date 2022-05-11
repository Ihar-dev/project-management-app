import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs';

import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { MessageBoxService } from 'src/app/core/services/message-box.service';

import { MessagesDefault } from 'src/app/shared/models/messages-type';
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

  constructor(
    private http: HttpClient,
    private lsService: LocalstorageService,
    private router: Router,
    private messageService: MessageBoxService,
  ) {}

  signUp(data: TUserData): void {
    this.http.post<UserDataResponce>(this.signUpUrl, JSON.stringify(data)).subscribe(() => {
      this.messageService.showMessage(MessagesDefault.signedUp);
      this.navigate('auth', 'login');
    });
  }

  signIn(data: TSigninData) {
    return this.http.post<TTokenResponce>(this.signInUrl, JSON.stringify(data)).pipe(
      map(({ token }) => {
        this.lsService.setItem(USER_TOKEN_KEY, token);
        this.lsService.setItem('login', data.login);
      }),
      switchMap(() => this.http.get<User[]>('users')),
      map((res) => {
        const userData = res.find((user) => data.login === user.login);
        if (userData) this.lsService.setItem(USER_DATA_KEY, new User(userData));
        return data.login;
      }),
    );
  }

  signOut(): void {
    this.lsService.clear();
    this.navigate('');
  }

  isAuthenticated(): boolean {
    return !!this.lsService.getItem<string>(USER_TOKEN_KEY);
  }

  private navigate(...paths: string[]): void {
    this.router.navigate(paths);
  }
}
