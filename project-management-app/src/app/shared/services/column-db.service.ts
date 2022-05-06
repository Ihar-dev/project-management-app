import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IColumn } from '../models/column.model';

@Injectable({
  providedIn: 'root',
})
export class ColumnDbService {
  private readonly boardsUrl = 'boards';

  constructor(private http: HttpClient) {}

  addColumn(boardID: string, column: Partial<IColumn>): Observable<IColumn> {
    return this.http.post<IColumn>(this.getUrl(boardID), column);
  }

  deleteColumn(boardID: string, columnID: string): Observable<null> {
    return this.http.delete<null>(`${this.getUrl(boardID)}/${columnID}`);
  }

  renameColumn(boardID: string, column: Partial<IColumn>) {
    return this.http.put<IColumn>(`${this.getUrl(boardID)}/${column.id}`, {title: column.title, order: column.order})
  }

  private getUrl(boardID: string): string {
    return `${this.boardsUrl}/${boardID}/columns`;
  }
}
