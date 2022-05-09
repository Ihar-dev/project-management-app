import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

const INPUT_TYPE_DEFAULT = 'text';
const INPUT_PLACEHOLDER_DEFAULT = 'Enter a value';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
})
export class FormFieldComponent {
  @Input() placeholder = INPUT_PLACEHOLDER_DEFAULT;

  @Input() type = INPUT_TYPE_DEFAULT;

  @Input() label = '';

  controlValue = new FormControl();

  @Input()
  set control(value: AbstractControl) {
    this.controlValue = <FormControl>value;
  }
}
