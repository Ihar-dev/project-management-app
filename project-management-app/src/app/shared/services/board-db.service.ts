import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  addBoard(board: Partial<IBoard>): Observable<IBoard> {
    return this.http.post<IBoard>(this.boardsUrl, board);
  }

  deleteBoard(id: string): Observable<null> {
    return this.http.delete<null>(`${this.boardsUrl}/${id}`);
  }

  getBoardByID(id: string): Observable<IBoard> {
    return this.http.get<IBoard>(`${this.boardsUrl}/${id}`);
  }

  renameBoard(id: string, board: Partial<IBoard>): Observable<IBoard> {
    return this.http.put<IBoard>(`${this.boardsUrl}/${id}`, board);
  }
}
