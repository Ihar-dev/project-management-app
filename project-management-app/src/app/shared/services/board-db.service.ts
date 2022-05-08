import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBoardRequest } from '../models/board-request.model';
import { IBoard } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardDbService {
  private readonly boardsUrl = 'boards';

  constructor(private http: HttpClient) {}

  getBoards(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(this.boardsUrl);
  }

  addBoard(board: IBoardRequest): Observable<IBoard> {
    return this.http.post<IBoard>(this.boardsUrl, board);
  }

  deleteBoard(id: string): Observable<null> {
    return this.http.delete<null>(`${this.boardsUrl}/${id}`);
  }

  getBoardByID(id: string): Observable<IBoard> {
    return this.http.get<IBoard>(`${this.boardsUrl}/${id}`);
  }

  updateBoard(id: string, board: IBoardRequest): Observable<IBoard> {
    return this.http.put<IBoard>(`${this.boardsUrl}/${id}`, board);
  }
}
