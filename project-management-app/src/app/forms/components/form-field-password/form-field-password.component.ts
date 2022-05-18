import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

const DEFAULT_PLACEHOLDER_TEXT = 'Password';
@Component({
  selector: 'app-form-field-password',
  templateUrl: './form-field-password.component.html',
  styleUrls: ['./form-field-password.component.scss'],
})
export class FormFieldPasswordComponent {
  readonly typePassword = 'password';

  readonly typeText = 'text';

  @Input() label = '';

  isPasswordShown = false;

  controlValue = new FormControl();

  @Input()
  set control(value: AbstractControl) {
    this.controlValue = <FormControl>value;
  }

  @Input() placeholder = DEFAULT_PLACEHOLDER_TEXT;

  togglePasswordVisibility(): void {
    this.isPasswordShown = !this.isPasswordShown;
  }
}
