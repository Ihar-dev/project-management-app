import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field-password',
  templateUrl: './form-field-password.component.html',
  styleUrls: ['./form-field-password.component.scss'],
})
export class FormFieldPasswordComponent {
  readonly typePassword = 'password';

  readonly typeText = 'text';

  isPasswordShown = false;

  @Input() control = new FormControl();

  @Input() placeholder = 'Password';

  togglePasswordVisibility(): void {
    this.isPasswordShown = !this.isPasswordShown;
  }
}
