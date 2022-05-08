import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { TestComponent } from './pages/test/test.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [WelcomeComponent, TestComponent],
  imports: [MainRoutingModule, FormsModule, SharedModule],
})
export class MainModule {}
