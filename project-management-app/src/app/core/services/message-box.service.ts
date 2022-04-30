import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MessagesDefault } from 'src/app/shared/models/messages-type';

export type MessageState = {
  isShown: boolean;
  message: MessagesDefault | string;
};

@Injectable({
  providedIn: 'root',
})
export class MessageBoxService {
  private isMessageShown = false;

  messageState$ = new Subject<MessageState>();

  showMessage(message: string | MessagesDefault): void {
    this.isMessageShown = true;
    this.setState({ isShown: this.isMessageShown, message });
  }

  hideMessage(): void {
    this.isMessageShown = false;
    this.setState({ isShown: this.isMessageShown, message: '' });
  }

  private setState(state: MessageState): void {
    this.messageState$.next(state);
  }
}
