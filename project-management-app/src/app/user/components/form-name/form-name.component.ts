import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { FormControlName, FormFieldLength } from 'src/app/forms/constants';
import { PasswordAsyncValidator } from 'src/app/forms/validators/passwordValidationAsync';
import { ERRORS_MESSAGES_EDIT_PROFILE_NAME } from 'src/app/forms/errors/error-messages-profile-name';
import { TUserData } from 'src/app/shared/models/register-data.model';
import { User } from 'src/app/shared/models/user.model';

const FORM_TITLE = 'Update general data';
@Component({
  selector: 'app-form-name',
  templateUrl: './form-name.component.html',
  styleUrls: ['./form-name.component.scss'],
})
export class FormNameComponent implements OnInit {
  @Input() set profile(val: User | null) {
    if (!val) {
      return;
    }
    if (this.form) {
      this.controlLogin.setValue(val.login);
      this.controlName.setValue(val.name);
    }
    this.nameVal = val.name;
    this.loginVal = val.login;
  }

  nameVal: string = '';

  loginVal: string = '';

  @Output() submitForm = new EventEmitter<TUserData>();

  form: FormGroup;

  readonly formErrors = ERRORS_MESSAGES_EDIT_PROFILE_NAME;

  readonly controlNameKey = FormControlName.name;

  readonly controlLoginKey = FormControlName.login;

  readonly controlOldPasswordKey = FormControlName.oldPassword;

  readonly title = FORM_TITLE;

  constructor(private fb: FormBuilder, private passwordAsyncValidator: PasswordAsyncValidator) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.nameVal, [Validators.required, Validators.minLength(FormFieldLength.name)]],
      login: [this.loginVal, [Validators.required, Validators.minLength(FormFieldLength.login)]],
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

  onSubmit(formDirective: FormGroupDirective): void {
    if (!this.form.valid) {
      return;
    }
    const { name, login, oldPassword: password } = this.form.value;
    this.submitForm.emit({ name, login, password });
    formDirective.resetForm();
    this.form.reset();
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
