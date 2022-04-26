import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TValidationError } from '../../shared/models/validation-error.model';

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

  readonly controlName = 'name';

  readonly controlLogin = 'login';

  readonly controlPassword = 'password';

  readonly controlPasswordConfirm = 'confirmPassword';

  readonly title = FORM_TITLE;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
}
