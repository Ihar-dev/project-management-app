import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { FormFieldPasswordComponent } from './components/form-field-password/form-field-password.component';
import { FormBtnComponent } from './components/form-btn/form-btn.component';
import { FormComponent } from './components/form/form.component';
import { FormErrorComponent } from './components/form-error/form-error.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegistrationPageComponent,
    FormFieldComponent,
    FormBtnComponent,
    FormComponent,
    FormErrorComponent,
    FormFieldPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
