import { Component, OnInit } from '@angular/core';

import { BoardsModel, MOCK_BOARDS } from '../../models/mock-boards.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public boards: BoardsModel = MOCK_BOARDS;

  ngOnInit(): void {
  }

}
