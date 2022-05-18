import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { StickyHeaderDirective } from './directives/sticky-header.directive';
import { ButtonComponent } from './components/button/button.component';
import { DialogCreationComponent } from './components/dialog-creation/dialog-creation.component';
import { BackButtonComponent } from './components/back-button/back-button.component';

@NgModule({
  declarations: [
    StickyHeaderDirective,
    ButtonComponent,
    DialogCreationComponent,
    BackButtonComponent,
  ],
  imports: [CommonModule, MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    StickyHeaderDirective,
    ButtonComponent,
    DialogCreationComponent,
    BackButtonComponent,
  ],
})
export class SharedModule {}
