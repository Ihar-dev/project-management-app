import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationFormService } from 'src/app/forms/validators/validation-form.service';
import { FormControlNames, FormFieldLength } from 'src/app/forms/constants';
import { PasswordAsyncValidator } from 'src/app/forms/validators/passwordValidationAsync';
import { ERRORS_MESSAGES_EDIT_PROFILE } from 'src/app/forms/errors/error-messages-profile';
import { UserService } from '../../services/user.service';

const FORM_TITLE = 'Edit profile';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {
  form: FormGroup;

  readonly formErrors = ERRORS_MESSAGES_EDIT_PROFILE;

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
        name: ['', [Validators.required, Validators.minLength(FormFieldLength.name)]],
        login: ['', [Validators.required, Validators.minLength(FormFieldLength.login)]],
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
