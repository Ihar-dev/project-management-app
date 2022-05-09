import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { FormControlNames } from '../../shared/constants';
import { TSigninData } from '../../shared/models/login-data.model';
import { TValidationError } from '../../../shared/models/validation-error.model';

const FORM_TITLE = 'Log in';
const ERRORS_MESSAGES: TValidationError = {
  login: [
    {
      type: 'required',
      message: 'Please enter a login.',
    },
  ],
  password: [
    {
      type: 'required',
      message: 'Please enter a password.',
    },
  ],
};

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  form: FormGroup;

  readonly formErrors = ERRORS_MESSAGES;

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
