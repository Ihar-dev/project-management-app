import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormControlNames } from 'src/app/forms/constants';
import { ERRORS_MESSAGES_EDIT_PROFILE_PASS } from 'src/app/forms/errors/error-messages-profile-pass';
import { PasswordAsyncValidator } from 'src/app/forms/validators/passwordValidationAsync';
import { ValidationFormService } from 'src/app/forms/validators/validation-form.service';

const FORM_TITLE = 'Change password';
@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.scss'],
})
export class FormPasswordComponent implements OnInit {
  form: FormGroup;

  readonly formErrors = ERRORS_MESSAGES_EDIT_PROFILE_PASS;

  readonly controlPasswordKey = FormControlNames.password;

  readonly controlOldPasswordKey = FormControlNames.oldPassword;

  readonly controlPasswordConfirmKey = FormControlNames.confirmPassword;

  readonly title = FORM_TITLE;

  constructor(
    private fb: FormBuilder,
    private validFormService: ValidationFormService,
    private passwordAsyncValidator: PasswordAsyncValidator,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
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
      console.log(this.form.value);
    }
  }

  get controlOldPassword(): AbstractControl {
    return this.form.controls[this.controlOldPasswordKey];
  }

  get controlPassword(): AbstractControl {
    return this.form.controls[this.controlPasswordKey];
  }

  get controlPasswordConfirm(): AbstractControl {
    return this.form.controls[this.controlPasswordConfirmKey];
  }
}
