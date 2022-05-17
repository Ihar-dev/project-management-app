import { Component, OnDestroy, OnInit } from '@angular/core';
import { debounceTime, map, ReplaySubject, takeUntil } from 'rxjs';
import { HTTP_ERROR_MESSAGE_DEFAULT } from 'src/app/shared/constants';
import { MessageState } from 'src/app/shared/models/message-state.model';
import { HttpErrorService } from '../../services/http-error.service';

const ERROR_MESSAGE = HTTP_ERROR_MESSAGE_DEFAULT;
const MESSAGE_DISAPPEAR_TIME = 5000;
const MESSAGE_LENGTH_MAX = 50;
const DEBOUNCE_TIME = 10;

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent implements OnInit, OnDestroy {
  state: MessageState = {
    isShown: false,
    message: ERROR_MESSAGE,
  };

  private destroyed$ = new ReplaySubject<boolean>(1);

  error$ = this.httpErrorService.error$;

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(private httpErrorService: HttpErrorService) {}

  ngOnInit(): void {
    this.httpErrorService.error$
      .pipe(
        takeUntil(this.destroyed$),
        map((state) => {
          if (this.state.isShown) {
            this.hideMessage();
          }
          return state;
        }),
        debounceTime(DEBOUNCE_TIME),
      )
      .subscribe((messageState) => {
        this.showMessage(messageState);
      });
  }

  private showMessage(state: MessageState): void {
    const currentState = state;
    currentState.message = currentState.message.substring(0, MESSAGE_LENGTH_MAX);
    this.state = state;
    if (this.state.isShown) {
      this.hideMessageDeffered();
    }
  }

  hideMessage(): void {
    this.state.isShown = false;
    this.clearTimeOut();
  }

  private hideMessageDeffered(): void {
    this.timeoutId = setTimeout(() => {
      this.hideMessage();
    }, MESSAGE_DISAPPEAR_TIME);
  }

  private clearTimeOut() {
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
    this.clearTimeOut();
  }
}
