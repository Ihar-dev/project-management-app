import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { StickyHeaderDirective } from './directives/sticky-header.directive';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [StickyHeaderDirective, ButtonComponent],
  exports: [BrowserModule, StickyHeaderDirective, ButtonComponent],
  imports: [CommonModule, BrowserModule, MaterialModule],
})
export class SharedModule {}
