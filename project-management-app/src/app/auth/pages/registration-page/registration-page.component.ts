import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const MIN_LENGTH_FIRST_NAME = 2;
const MIN_LENGTH_LOGIN = 8;

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(MIN_LENGTH_FIRST_NAME)],
      ],
      login: [
        '',
        [Validators.required, Validators.minLength(MIN_LENGTH_LOGIN)],
      ],
      passwords: this.fb.group({
        password: ['', Validators.compose([Validators.required])],
        confirmPassword: ['', [Validators.required]],
      }),
    });
  }
}
