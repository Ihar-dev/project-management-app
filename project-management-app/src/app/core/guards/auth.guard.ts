import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canLoad(): boolean {
    const isAuth = this.authService.isUserAuthenticated();
    if (!isAuth) {
      this.router.navigate(['welcome']);
    }

    return isAuth;
  }
}
