import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidationFormService } from '../../services/validation-form.service';
import { FormControlNames } from '../../shared/constants';
import { TSignupData } from '../../shared/models/register-data.model';
import { TValidationError } from '../../shared/models/validation-error.model';

const MIN_LENGTH_NAME = 2;
const MIN_LENGTH_LOGIN = 8;
const MIN_LENGTH_PASSWORD = 8;
const FORM_TITLE = 'signup-title';

const ERRORS_MESSAGES: TValidationError = {
  name: [
    {
      type: 'required',
      message: 'Please enter a name.',
      transloco: 'name',
    },
    {
      type: 'minlength',
      message: `The min length is ${MIN_LENGTH_NAME} symbols.`,
      transloco: 'length',
      length: MIN_LENGTH_NAME,
    },
  ],
  login: [
    {
      type: 'required',
      message: 'Please enter a login.',
      transloco: 'login',
    },
    {
      type: 'minlength',
      message: `The min length is ${MIN_LENGTH_LOGIN} symbols.`,
      transloco: 'length',
      length: MIN_LENGTH_LOGIN,
    },
  ],
  password: [
    {
      type: 'required',
      message: 'Please enter a password.',
      transloco: 'password',
    },
    {
      type: 'minlength',
      message: `The min length is ${MIN_LENGTH_PASSWORD} characters.`,
      transloco: 'length',
      length: MIN_LENGTH_PASSWORD,
    },
    {
      type: 'upLowCase',
      message: `Should include uppercase and lowercase letters.`,
      transloco: 'password-upLowCase',
    },
    {
      type: 'digits',
      message: `Should include at least 1 digit.`,
      transloco: 'password-digits',
    },
    {
      type: 'specialCharacters',
      message: `Should include 1 special character (!@#$%^&?[]).`,
      transloco: 'password-special',
    },
  ],
  confirmPassword: [
    {
      type: 'required',
      message: 'Please confirm a password.',
      transloco: 'password-confirm',
    },
    {
      type: 'passwordMismatch',
      message: 'Passwords do not match!',
      transloco: 'password-match',
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

  readonly controlNameKey = FormControlNames.name;

  readonly controlLoginKey = FormControlNames.login;

  readonly controlPasswordKey = FormControlNames.password;

  readonly controlPasswordConfirmKey = FormControlNames.confirmPassword;

  readonly title = FORM_TITLE;

  constructor(
    private fb: FormBuilder,
    private validFormService: ValidationFormService,
    private authService: AuthService,
  ) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(MIN_LENGTH_NAME)]],
        login: ['', [Validators.required, Validators.minLength(MIN_LENGTH_LOGIN)]],
        password: [
          '',
          Validators.compose([Validators.required, this.validFormService.validatePassword()]),
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.validFormService.confirmPassword(),
      },
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { confirmPassword, ...signUpData } = this.form.value;
      this.authService.signUp(<TSignupData>signUpData);
      this.form.reset();
    }
  }

  get controlName(): AbstractControl {
    return this.form.controls[this.controlNameKey];
  }

  get controlLogin(): AbstractControl {
    return this.form.controls[this.controlLoginKey];
  }

  get controlPassword(): AbstractControl {
    return this.form.controls[this.controlPasswordKey];
  }

  get controlPasswordConfirm(): AbstractControl {
    return this.form.controls[this.controlPasswordConfirmKey];
  }
}
