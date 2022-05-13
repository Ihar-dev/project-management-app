import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { SharedModule } from '../shared/shared.module';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardComponent } from './components/board/board.component';
import { ColumnComponent } from './components/board/column/column.component';
import { TaskComponent } from './components/board/column/task/task.component';
import { ClickStopPropagationDirective } from './shared/directives/click-stop-propagation.directive';
import { ButtonBoardDeleteComponent } from './shared/components/button-board-delete/button-board-delete.component';
import { ButtonBoardCreateComponent } from './shared/components/button-board-create/button-board-create.component';
import { TaskMemberComponent } from './components/board/column/task/task-member/task-member.component';
import { ColumnEditComponent } from './components/board/column/column-edit/column-edit.component';

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
    ColumnEditComponent,
  ],
  imports: [CommonModule, BoardsRoutingModule, MaterialModule, SharedModule],
})
export class BoardsModule {}
