import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../shared/material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import {
  FormFieldPasswordComponent
} from './components/form-field-password/form-field-password.component';
import { FormComponent } from './components/form/form.component';
import { FormErrorComponent } from './components/form-error/form-error.component';
import { FormTitleComponent } from './components/form-title/form-title.component';
import { FormSubmitComponent } from './components/form-submit/form-submit.component';
import { AuthMainComponent } from './components/auth-main/auth-main.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegistrationPageComponent,
    FormFieldComponent,
    FormComponent,
    FormErrorComponent,
    FormFieldPasswordComponent,
    FormTitleComponent,
    FormSubmitComponent,
    AuthMainComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, MaterialModule, ReactiveFormsModule, SharedModule],
})
export class AuthModule {}
