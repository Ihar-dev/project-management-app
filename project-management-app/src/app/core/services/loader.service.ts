import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isShownSpinner = false;

  spinnerVisibility$ = new Subject<boolean>();

  showSpinner(): void {
    this.isShownSpinner = true;
    this.spinnerVisibility$.next(this.isShownSpinner);
  }

  hideSpinner(): void {
    this.isShownSpinner = false;
    this.spinnerVisibility$.next(this.isShownSpinner);
  }
}
