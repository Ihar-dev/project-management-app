import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/material.module';

import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormFieldPasswordComponent } from './components/form-field-password/form-field-password.component';
import { FormComponent } from './components/form/form.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { FormTitleComponent } from './components/form-title/form-title.component';
import { FormSubmitComponent } from './components/form-submit/form-submit.component';

const formsDeclarations = [
  FormFieldComponent,
  FormComponent,
  FormErrorComponent,
  FormFieldPasswordComponent,
  FormTitleComponent,
  FormSubmitComponent,
];
@NgModule({
  declarations: [...formsDeclarations],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, TranslocoModule],
  exports: [...formsDeclarations],
})
export class FormsModule {}
