import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TFormError } from '../../shared/models/validation-error.model';

@Component({
  selector: 'app-form-error',
  templateUrl: './form-error.component.html',
  styleUrls: ['./form-error.component.scss'],
})
export class FormErrorComponent implements OnInit {
  @Input() control: AbstractControl | null = null;

  @Input() errors: TFormError[] = [];

  ngOnInit(): void {
    console.log('errors');
  }
}
