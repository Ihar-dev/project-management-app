import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  FormGroupDirective,
} from '@angular/forms';
import { FormControlName } from 'src/app/forms/constants';
import { ERRORS_MESSAGES_EDIT_PROFILE_PASS } from 'src/app/forms/errors/error-messages-profile-pass';
import { PasswordAsyncValidator } from 'src/app/forms/validators/passwordValidationAsync';
import { ValidationFormService } from 'src/app/forms/validators/validation-form.service';
import { TUserData } from 'src/app/shared/models/register-data.model';

const FORM_TITLE = 'profile.change-password';
@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.scss'],
})
export class FormPasswordComponent implements OnInit {
  @Input() name: string = '';

  @Input() login: string = '';

  @Output() submitForm = new EventEmitter<TUserData>();

  form: FormGroup;

  readonly formErrors = ERRORS_MESSAGES_EDIT_PROFILE_PASS;

  readonly controlPasswordKey = FormControlName.password;

  readonly controlOldPasswordKey = FormControlName.oldPassword;

  readonly controlPasswordConfirmKey = FormControlName.confirmPassword;

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
        password: ['', [Validators.required, this.validFormService.validatePassword()]],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.validFormService.confirmPassword(),
      },
    );
  }

  onSubmit(formDirective: FormGroupDirective): void {
    if (!this.form.valid) {
      return;
    }
    const { password } = this.form.value;
    this.submitForm.emit({ name: this.name, login: this.login, password });
    this.form.reset();
    formDirective.resetForm();
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
