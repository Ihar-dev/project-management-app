import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { BoardResolver } from './resolvers/board.resolver';

const routes: Routes = [
  {
    path: ':id',
    component: BoardPageComponent,
    resolve: {
      board: BoardResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule {}
