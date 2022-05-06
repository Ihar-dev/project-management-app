import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';

import { MainRoutingModule } from './main-routing.module';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { MaterialModule } from '../shared/material.module';
import { MainComponent } from './pages/main/main.component';
import { BoardComponent } from './components/board/board.component';


@NgModule({
  declarations: [
    WelcomeComponent,
    MainComponent,
    BoardComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MaterialModule,
    CoreModule
  ]
})
export class MainModule { }
