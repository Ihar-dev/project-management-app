import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MessageBoxService } from 'src/app/core/services/message-box.service';
import { HTTP_ERROR_MESSAGE_DEFAULT } from 'src/app/shared/constants';
import { MessageState } from 'src/app/shared/models/message-state.model';

const ERROR_MESSAGE = HTTP_ERROR_MESSAGE_DEFAULT;
const MESSAGE_DISAPPEAR_TIME = 10000;
const MESSAGE_LENGTH_MAX = 50;

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
})
export class MessageBoxComponent implements OnInit, OnDestroy {
  message: string = ERROR_MESSAGE;

  isMessageBoxShown: boolean = false;

  private subs = Subscription.EMPTY;

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(private messageService: MessageBoxService) {}

  ngOnInit(): void {
    this.subs = this.messageService.messageState$.subscribe((messageState) =>
      this.toggleMessage(messageState),
    );
  }

  private toggleMessage(messageState: MessageState): void {
    this.isMessageBoxShown = messageState.isShown;
    this.message = messageState.message.substring(0, MESSAGE_LENGTH_MAX);
    if (this.isMessageBoxShown) {
      this.hideMessageDeffered();
    }
  }

  private hideMessageDeffered(): void {
    this.timeoutId = setTimeout(() => {
      this.hideMessage();
    }, MESSAGE_DISAPPEAR_TIME);
  }

  hideMessage(): void {
    this.isMessageBoxShown = false;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    if (this.timeoutId) clearTimeout(this.timeoutId);
  }
}
