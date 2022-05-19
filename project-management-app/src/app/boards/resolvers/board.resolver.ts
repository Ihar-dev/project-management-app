import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, EMPTY, filter, map, Observable, take } from 'rxjs';
import { IBoard } from 'src/app/shared/models/board.model';
import { BoardActions } from 'src/app/store/actions/board.action';
import { BoardSelectors } from 'src/app/store/selectors/board.selector';

@Injectable({
  providedIn: 'root',
})
export class BoardResolver implements Resolve<Observable<IBoard | null>> {
  constructor(private store: Store, private router: Router) {
    this.store.dispatch(BoardActions.getBoards());
  }

  resolve(route: ActivatedRouteSnapshot): Observable<IBoard | null> {
    const id = route.paramMap.get('id') || '';

    return this.store.select(BoardSelectors.selectBoards).pipe(
      filter((data) => !!data.length),
      map((data) => {
        const board = data.find((elem) => elem.id === id);
        if (board) {
          return board;
        }
        this.handleError();
        return null;
      }),
      take(1),
      catchError(() => this.handleError()),
    );
  }

  private handleError() {
    this.router.navigateByUrl('404', { skipLocationChange: true });
    return EMPTY;
  }
}
