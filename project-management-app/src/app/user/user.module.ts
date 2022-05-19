import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { TranslocoModule } from '@ngneat/transloco';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '../forms/forms.module';

import { UserRoutingModule } from './user-routing.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { FormNameComponent } from './components/form-name/form-name.component';
import { FormPasswordComponent } from './components/form-password/form-password.component';

@NgModule({
  declarations: [ProfilePageComponent, TabsComponent, FormNameComponent, FormPasswordComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    TranslocoModule,
  ],
})
export class UserModule {}
