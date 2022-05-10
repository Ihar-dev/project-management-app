import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormControlNames, FormFieldLength } from 'src/app/forms/constants';
import { PasswordAsyncValidator } from 'src/app/forms/validators/passwordValidationAsync';
import { ERRORS_MESSAGES_EDIT_PROFILE_NAME } from 'src/app/forms/errors/error-messages-profile-name';
import { UserService } from '../../services/user.service';

const FORM_TITLE = 'Update general data';
@Component({
  selector: 'app-form-name',
  templateUrl: './form-name.component.html',
  styleUrls: ['./form-name.component.scss'],
})
export class FormNameComponent {
  form: FormGroup;

  readonly formErrors = ERRORS_MESSAGES_EDIT_PROFILE_NAME;

  readonly controlNameKey = FormControlNames.name;

  readonly controlLoginKey = FormControlNames.login;

  readonly controlOldPasswordKey = FormControlNames.oldPassword;

  readonly title = FORM_TITLE;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private passwordAsyncValidator: PasswordAsyncValidator,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(FormFieldLength.name)]],
      login: ['', [Validators.required, Validators.minLength(FormFieldLength.login)]],
      oldPassword: [
        '',
        {
          validators: Validators.required,
          asyncValidators: [this.passwordAsyncValidator.validate.bind(this.passwordAsyncValidator)],
          updateOn: 'blur',
        },
      ],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }

  get controlName(): AbstractControl {
    return this.form.controls[this.controlNameKey];
  }

  get controlLogin(): AbstractControl {
    return this.form.controls[this.controlLoginKey];
  }

  get controlOldPassword(): AbstractControl {
    return this.form.controls[this.controlOldPasswordKey];
  }
}
