import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { FormControlName } from 'src/app/forms/constants';
import { ERRORS_MESSAGES_LOGIN } from 'src/app/forms/errors/error-messages-login';
import { TSigninData } from 'src/app/shared/models/login-data.model';
import { Store } from '@ngrx/store';
import { login } from 'src/app/store/actions/auth.action';

const FORM_TITLE = 'Log in';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  form: FormGroup;

  readonly formErrors = ERRORS_MESSAGES_LOGIN;

  readonly controlLoginKey = FormControlName.login;

  readonly controlPasswordKey = FormControlName.password;

  readonly title = FORM_TITLE;

  constructor(private fb: FormBuilder, private store: Store) {
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return;
    }
    const signInData = this.form.value;
    this.store.dispatch(login({ userData: <TSigninData>signInData }));
    this.form.reset();
  }

  get controlLogin(): AbstractControl {
    return this.form.controls[this.controlLoginKey];
  }

  get controlPassword(): AbstractControl {
    return this.form.controls[this.controlPasswordKey];
  }
}
