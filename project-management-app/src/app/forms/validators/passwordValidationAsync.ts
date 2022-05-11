import { Injectable } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map, catchError, of } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { USER_DATA_KEY } from 'src/app/shared/constants';
import { User } from 'src/app/shared/models/user.model';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Injectable({ providedIn: 'root' })
export class PasswordAsyncValidator implements AsyncValidator {
  constructor(private authService: AuthService, private lsService: LocalstorageService) {}

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const userData = this.lsService.getItem<User>(USER_DATA_KEY);

    if (userData && control.value) {
      return this.authService.signIn({ login: userData.login, password: control.value }).pipe(
        map((res) => (res ? null : of({ wrongPass: true }))),
        catchError(() => of({ wrongPass: true })),
      );
    }
    return of(null);
  }
}
