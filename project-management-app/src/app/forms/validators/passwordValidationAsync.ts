import { Injectable, OnDestroy } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, map, catchError, of, Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { selectProfile } from 'src/app/store/selectors/auth.selector';

@Injectable({ providedIn: 'root' })
export class PasswordAsyncValidator implements AsyncValidator, OnDestroy {
  profile$: Observable<User | null> = this.store.select(selectProfile);

  userData: User | null = null;

  subs: Subscription = Subscription.EMPTY;

  constructor(private authService: AuthService, private store: Store) {
    this.subs = this.profile$.subscribe((val) => {
      this.userData = val;
    });
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    if (this.userData && control.value) {
      return this.authService.signIn({ login: this.userData.login, password: control.value }).pipe(
        map((res) => (res ? null : of({ wrongPass: true }))),
        catchError(() => of({ wrongPass: true })),
      );
    }
    return of(null);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
