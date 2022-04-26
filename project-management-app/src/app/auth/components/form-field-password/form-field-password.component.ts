import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-password',
  templateUrl: './form-field-password.component.html',
  styleUrls: ['./form-field-password.component.scss'],
})
export class FormFieldPasswordComponent {
  readonly typePassword = 'password';

  readonly typeText = 'text';

  isPasswordShown = false;

  controlValue = new FormControl();

  @Input()
  set control(value: AbstractControl) {
    this.controlValue = <FormControl>value;
  }

  @Input() placeholder = 'Password';

  togglePasswordVisibility(): void {
    this.isPasswordShown = !this.isPasswordShown;
  }
}
