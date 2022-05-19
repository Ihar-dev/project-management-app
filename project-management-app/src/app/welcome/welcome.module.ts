import { NgModule } from '@angular/core';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, WelcomeRoutingModule, TranslocoModule, MaterialModule],
})
export class WelcomeModule {}
