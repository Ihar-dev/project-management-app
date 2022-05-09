import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '../shared/forms.module';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { AuthMainComponent } from './components/auth-main/auth-main.component';

@NgModule({
  declarations: [LoginPageComponent, RegistrationPageComponent, AuthMainComponent],
  imports: [AuthRoutingModule, SharedModule, FormsModule],
})
export class AuthModule {}
