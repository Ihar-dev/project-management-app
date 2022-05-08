import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { StickyHeaderDirective } from './directives/sticky-header.directive';
import { ButtonComponent } from './components/button/button.component';
import { HeaderComponent } from './components/header/header/header.component';
import { LogoComponent } from './components/header/logo/logo.component';
import { UserBoxComponent } from './components/header/user-box/user-box.component';
import { CreateButtonComponent } from './components/header/create-button/create-button.component';

@NgModule({
  declarations: [
    StickyHeaderDirective,
    ButtonComponent,
    HeaderComponent,
    LogoComponent,
    UserBoxComponent,
    CreateButtonComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [CommonModule, MaterialModule, StickyHeaderDirective, ButtonComponent, HeaderComponent],
})
export class SharedModule {}
