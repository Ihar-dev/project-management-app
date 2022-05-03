import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MaterialModule } from '../shared/material.module';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardComponent } from './components/board/board.component';
import { ColumnComponent } from './components/board/column/column.component';
import { TaskComponent } from './components/board/column/task/task.component';
import { ClickStopPropagationDirective } from './shared/directives/click-stop-propagation.directive';
import { ButtonBoardDeleteComponent } from './shared/components/button-board-delete/button-board-delete.component';
import { ButtonBoardCreateComponent } from './shared/components/button-board-create/button-board-create.component';
import { TaskMemberComponent } from './components/board/column/task/task-member/task-member.component';

@NgModule({
  declarations: [
    BoardPageComponent,
    BoardComponent,
    ColumnComponent,
    TaskComponent,
    ClickStopPropagationDirective,
    ButtonBoardDeleteComponent,
    ButtonBoardCreateComponent,
    TaskMemberComponent,
  ],
  imports: [CommonModule, BoardsRoutingModule, MaterialModule, MatSlideToggleModule],
})
export class BoardsModule {}
