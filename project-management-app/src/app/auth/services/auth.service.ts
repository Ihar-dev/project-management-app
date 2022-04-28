import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { MessageBoxService } from 'src/app/core/services/message-box.service';

import { MessagesDefault } from 'src/app/shared/models/messages-type';
import { TSignupData } from '../shared/models/register-data.model';
import { User, UserDataResponce } from '../shared/models/user.model';
import { USER_DATA_KEY, USER_TOKEN_KEY } from '../shared/constants';
import { TSigninData } from '../shared/models/login-data.model';
import { TTokenResponce } from '../shared/models/token-responce.model';

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

  signUp(data: TSignupData) {
    this.http.post<UserDataResponce>(this.signUpUrl, JSON.stringify(data)).subscribe((res) => {
      this.lsService.setItem(USER_DATA_KEY, new User(res));
      this.messageService.showMessage(MessagesDefault.signedUp);
      this.router.navigate(['auth/signin']);
    });
  }

  signIn(data: TSigninData) {
    this.http.post<TTokenResponce>(this.signInUrl, JSON.stringify(data)).subscribe(({ token }) => {
      this.lsService.setItem(USER_TOKEN_KEY, token);
      this.router.navigate(['']);
    });
  }

  signOut(): void {
    this.lsService.clear();
    this.router.navigate(['']);
  }

  isAuthenticated() {}
}
