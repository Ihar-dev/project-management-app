import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TValidationError } from '../../shared/models/validation-error.model';

const MIN_LENGTH_NAME = 2;
const MIN_LENGTH_LOGIN = 8;

const ERRORS_MESSAGES: TValidationError = {
  name: [
    { type: 'required', message: 'Please enter your name.' },
    {
      type: 'minlength',
      message: `The min length is ${MIN_LENGTH_NAME} symbols.`,
    },
  ],
  login: [
    {
      type: 'required',
      message: 'Please enter a login.',
    },
    {
      type: 'minlength',
      message: `The min length is ${MIN_LENGTH_LOGIN} symbols.`,
    },
  ],
  password: [
    {
      type: 'required',
      message: 'Please enter a password.',
    },
    {
      type: 'invalidPassword',
      message: `Your password isn't strong enough. It must have:
            at least 8 characters, uppercase and lowercase letters,
            at least 1 digit,
            and 1 special character (!@#$%^&?[])`,
    },
  ],
  confirmPassword: [
    {
      type: 'required',
      message: 'Please confirm a password.',
    },
    {
      type: 'passwordMismatch',
      message: 'Passwords do not match!',
    },
  ],
};

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent {
  form: FormGroup;

  readonly formErrors = ERRORS_MESSAGES;

  readonly controlName = 'name';

  readonly controlLogin = 'login';

  readonly controlPassword = 'password';

  readonly controlPasswordConfirm = 'confirmPassword';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(MIN_LENGTH_NAME)]],
      login: [
        '',
        [Validators.required, Validators.minLength(MIN_LENGTH_LOGIN)],
      ],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', [Validators.required]],
    });
  }
}
