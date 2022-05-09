import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '../shared/forms.module';

import { UserRoutingModule } from './user-routing.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

@NgModule({
  declarations: [ProfilePageComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
})
export class UserModule {}
