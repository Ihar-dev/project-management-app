import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ValidationFormService } from '../../services/validation-form.service';
import { TRegisterData } from '../../shared/models/register-data.model';
import { TValidationError } from '../../shared/models/validation-error.model';

const MIN_LENGTH_NAME = 2;
const MIN_LENGTH_LOGIN = 8;
const MIN_LENGTH_PASSWORD = 8;
const FORM_TITLE = 'Sign up';

const ERRORS_MESSAGES: TValidationError = {
  name: [
    { type: 'required', message: 'Please enter a name.' },
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
      type: 'minlength',
      message: `The min length is ${MIN_LENGTH_PASSWORD} characters.`,
    },
    {
      type: 'upLowCase',
      message: `Should include uppercase and lowercase letters.`,
    },
    {
      type: 'digits',
      message: `Should include at least 1 digit.`,
    },
    {
      type: 'specialCharacters',
      message: `Should include 1 special character (!@#$%^&?[]).`,
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

  readonly controlNameKey = 'name';

  readonly controlLoginKey = 'login';

  readonly controlPasswordKey = 'password';

  readonly controlPasswordConfirmKey = 'confirmPassword';

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
      this.authService.signUp(<TRegisterData>signUpData);
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
