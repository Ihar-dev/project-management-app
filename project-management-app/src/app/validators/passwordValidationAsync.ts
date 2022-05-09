import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map, catchError, of, debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { USER_DATA_KEY } from '../auth/shared/constants';
import { User } from '../auth/shared/models/user.model';
import { LocalstorageService } from '../core/services/localstorage.service';

const DEBOUNCE_TIME = 500;
@Injectable({ providedIn: 'root' })
export class PasswordAsyncValidator implements AsyncValidator {
  constructor(private authService: AuthService, private lsService: LocalstorageService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const userData = this.lsService.getItem<User>(USER_DATA_KEY);

    if (userData && control.value) {
      return this.authService.signIn({ login: userData.login, password: control.value }).pipe(
        debounceTime(DEBOUNCE_TIME),
        distinctUntilChanged(),
        map((res) => (res ? null : of({ wrongPass: true }))),
        catchError(() => of({ wrongPass: true })),
      );
    }
    return of(null);
  }
}
