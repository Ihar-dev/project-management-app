import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { MainRoutingModule } from './main-routing.module';
import { WelcomeComponent } from '../welcome/pages/welcome/welcome.component';
import { MaterialModule } from '../shared/material.module';
import { MainComponent } from './pages/main/main.component';
import { BoardComponent } from './components/board/board.component';
import { TestComponent } from './pages/test/test.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    WelcomeComponent,
    MainComponent,
    BoardComponent,
    TestComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainModule {}
