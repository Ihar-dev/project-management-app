import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { StickyHeaderDirective } from './directives/sticky-header.directive';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [StickyHeaderDirective, ButtonComponent],
  imports: [CommonModule, MaterialModule],
  exports: [CommonModule, MaterialModule, StickyHeaderDirective, ButtonComponent],
})
export class SharedModule {}
