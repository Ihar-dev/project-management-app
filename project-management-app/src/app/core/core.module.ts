import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';

import { MessageBoxComponent } from './components/message-box/message-box.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [MessageBoxComponent, LoaderComponent],
  imports: [CommonModule, MaterialModule],
  exports: [MessageBoxComponent, LoaderComponent],
})
export class CoreModule {}
