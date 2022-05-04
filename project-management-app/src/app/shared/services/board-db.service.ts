import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Board } from '../models/board.model';

@Injectable({
  providedIn: 'root',
})
export class BoardDbService {
  private readonly boardsUrl = 'boards';

  constructor(private http: HttpClient) {}

  getBoards(): Observable<Board[]> {
    return this.http
      .get<Board[]>(this.boardsUrl)
      .pipe(catchError(this.handleError<Board[]>('getBoards', [])));
  }

  addBoard(board: Board): Observable<Board> {
    return this.http.post<Board>(this.boardsUrl, board);
  }

  deleteBoard(id: string): Observable<null> {
    return this.http.delete<null>(`${this.boardsUrl}/${id}`);
  }

  getBoardByID(id: string): Observable<Board> {
    return this.http.get<Board>(`${this.boardsUrl}/${id}`);
  }

  renameBoard(id: string, board: Board): Observable<Board> {
    return this.http.put<Board>(`${this.boardsUrl}/${id}`, board);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation}: `, error);
      return of(result as T);
    };
  }
}
