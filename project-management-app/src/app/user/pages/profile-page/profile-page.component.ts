import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationFormService } from 'src/app/validators/validation-form.service';
import { FormControlNames } from 'src/app/auth/shared/constants';
import { TValidationError } from 'src/app/shared/models/validation-error.model';
import { PasswordAsyncValidator } from 'src/app/validators/passwordValidationAsync';
import { UserService } from '../../services/user.service';

const FORM_TITLE = 'Edit profile';
const MIN_LENGTH_NAME = 2;
const MIN_LENGTH_LOGIN = 8;
const MIN_LENGTH_PASSWORD = 8;

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
      message: `Include uppercase and lowercase letters.`,
    },
    {
      type: 'digits',
      message: `Include at least 1 digit.`,
    },
    {
      type: 'specialCharacters',
      message: `Include 1 special character (!@#$%^&?[]).`,
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
  oldPassword: [
    {
      type: 'required',
      message: 'Please enter a password.',
    },
    {
      type: 'wrongPass',
      message: 'Wrong password!',
    },
  ],
};
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  form: FormGroup;

  readonly formErrors = ERRORS_MESSAGES;

  readonly controlNameKey = FormControlNames.name;

  readonly controlLoginKey = FormControlNames.login;

  readonly controlPasswordKey = FormControlNames.password;

  readonly controlOldPasswordKey = FormControlNames.oldPassword;

  readonly controlPasswordConfirmKey = FormControlNames.confirmPassword;

  readonly title = FORM_TITLE;

  constructor(
    private fb: FormBuilder,
    private validFormService: ValidationFormService,
    private userService: UserService,
    private passwordAsyncValidator: PasswordAsyncValidator,
  ) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(MIN_LENGTH_NAME)]],
        login: ['', [Validators.required, Validators.minLength(MIN_LENGTH_LOGIN)]],
        oldPassword: [
          '',

          {
            validators: Validators.required,
            asyncValidators: [
              this.passwordAsyncValidator.validate.bind(this.passwordAsyncValidator),
            ],
            updateOn: 'blur',
          },
        ],
        password: ['', [this.validFormService.validatePassword()]],
        confirmPassword: [''],
      },
      {
        validators: this.validFormService.confirmPassword(),
      },
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { confirmPassword, ...userData } = this.form.value;
      this.form.reset();
      this.userService.updateUser(userData);
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

  get controlOldPassword(): AbstractControl {
    return this.form.controls[this.controlOldPasswordKey];
  }

  get controlPasswordConfirm(): AbstractControl {
    return this.form.controls[this.controlPasswordConfirmKey];
  }
}
