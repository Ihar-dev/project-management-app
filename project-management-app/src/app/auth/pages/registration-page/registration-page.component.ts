import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationFormService } from 'src/app/forms/validators/validation-form.service';
import { FormControlName, FormFieldLength } from 'src/app/forms/constants';
import { ERRORS_MESSAGES_SIGNUP } from 'src/app/forms/errors/error-messages-signup';
import { TUserData } from 'src/app/shared/models/register-data.model';
import { Store } from '@ngrx/store';
import { signup } from 'src/app/store/actions/auth.action';

const FORM_TITLE = 'signup-title';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent {
  form: FormGroup;

  readonly formErrors = ERRORS_MESSAGES_SIGNUP;

  readonly controlNameKey = FormControlName.name;

  readonly controlLoginKey = FormControlName.login;

  readonly controlPasswordKey = FormControlName.password;

  readonly controlPasswordConfirmKey = FormControlName.confirmPassword;

  readonly title = FORM_TITLE;

  constructor(
    private fb: FormBuilder,
    private validFormService: ValidationFormService,
    private store: Store,
  ) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(FormFieldLength.name)]],
        login: ['', [Validators.required, Validators.minLength(FormFieldLength.login)]],
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
    if (!this.form.valid) {
      return;
    }
    const { confirmPassword, ...signUpData } = this.form.value;
    this.store.dispatch(signup({ userData: <TUserData>signUpData }));
    this.form.reset();
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
