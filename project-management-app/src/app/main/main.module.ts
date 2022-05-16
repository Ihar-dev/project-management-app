import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { MainRoutingModule } from './main-routing.module';
import { MaterialModule } from '../shared/material.module';
import { MainComponent } from './pages/main/main.component';
import { BoardComponent } from './components/board/board.component';
import { TestComponent } from './pages/test/test.component';
import { SharedModule } from '../shared/shared.module';
import { MouseMoveStopPropagationDirective } from '../shared/directives/mouse-move-stop-propagation.directive';
import { MouseClickStopPropagationDirective } from '../shared/directives/mouse-click-stop-propagation.directive';
import { RandomPhotoBackDirective } from '../shared/directives/random-photo-back.directive';

@NgModule({
  declarations: [
    MainComponent,
    BoardComponent,
    TestComponent,
    MouseMoveStopPropagationDirective,
    MouseClickStopPropagationDirective,
    RandomPhotoBackDirective,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class MainModule {}
