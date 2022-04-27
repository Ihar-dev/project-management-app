import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickyHeaderDirective } from './directives/sticky-header.directive';

@NgModule({
  declarations: [StickyHeaderDirective],
  exports: [StickyHeaderDirective],
  imports: [CommonModule],
})
export class SharedModule {}
