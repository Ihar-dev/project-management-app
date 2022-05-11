import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { FormControlNames } from 'src/app/forms/constants';
import { ERRORS_MESSAGES_LOGIN } from 'src/app/forms/errors/error-messages-login';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TSigninData } from 'src/app/shared/models/login-data.model';

const FORM_TITLE = 'Log in';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  form: FormGroup;

  readonly formErrors = ERRORS_MESSAGES_LOGIN;

  readonly controlLoginKey = FormControlNames.login;

  readonly controlPasswordKey = FormControlNames.password;

  readonly title = FORM_TITLE;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const signInData = this.form.value;
      this.authService.signIn(<TSigninData>signInData).subscribe(() => {
        this.router.navigate(['']);
      });
      this.form.reset();
    }
  }

  get controlLogin(): AbstractControl {
    return this.form.controls[this.controlLoginKey];
  }

  get controlPassword(): AbstractControl {
    return this.form.controls[this.controlPasswordKey];
  }
}
