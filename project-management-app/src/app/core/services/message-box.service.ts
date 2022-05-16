import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpErrorMessage } from 'src/app/shared/models/messages-type';

export type MessageState = {
  isShown: boolean;
  message: HttpErrorMessage;
};

@Injectable({
  providedIn: 'root',
})
export class MessageBoxService {
  private state: MessageState = {
    isShown: false,
    message: HttpErrorMessage.default,
  };

  messageState$ = new Subject<MessageState>();

  showMessage(message: HttpErrorMessage): void {
    this.toggleShownState(true);
    this.state.message = message;
    this.setState(this.state);
  }

  hideMessage(): void {
    this.toggleShownState(false);
    this.setState(this.state);
  }

  private setState(state: MessageState): void {
    this.messageState$.next(state);
  }

  private toggleShownState(value: boolean): void {
    this.state.isShown = value;
  }
}
