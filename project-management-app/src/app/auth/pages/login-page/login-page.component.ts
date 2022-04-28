import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { TValidationError } from '../../shared/models/validation-error.model';

const FORM_TITLE = 'Sign in';
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

  readonly controlLoginKey = 'login';

  readonly controlPasswordKey = 'password';

  readonly title = FORM_TITLE;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get controlLogin(): AbstractControl {
    return this.form.controls[this.controlLoginKey];
  }

  get controlPassword(): AbstractControl {
    return this.form.controls[this.controlPasswordKey];
  }
}
