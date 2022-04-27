import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TRegisterData } from '../shared/models/register-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signUpUrl = 'http://localhost:4200/api/signup';

  constructor(private http: HttpClient) {}

  signUp(data: TRegisterData) {
    this.http
      .post(this.signUpUrl, JSON.stringify(data), {
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      })
      .subscribe((res) => console.log(res));
  }

  signIn() {}

  isAuthenticated() {}
}
