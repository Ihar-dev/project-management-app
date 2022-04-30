import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { StickyHeaderDirective } from './directives/sticky-header.directive';

@NgModule({
  declarations: [StickyHeaderDirective],
  exports: [BrowserModule, StickyHeaderDirective],
  imports: [CommonModule, BrowserModule],
})
export class SharedModule {}
