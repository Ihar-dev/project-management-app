import { Injectable } from '@angular/core';
import { MessagesDefault } from 'src/app/shared/models/messages-type';
import { MessageBoxService } from './message-box.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private messageService: MessageBoxService) {}

  getItem<T>(key: string): T | null {
    try {
      const res = localStorage.getItem(key);
      if (res) {
        return <T>JSON.parse(res);
      }
    } catch (err) {
      this.handleError(err);
    }

    return null;
  }

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      this.handleError(err);
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }

  private handleError(err: unknown): void {
    this.messageService.showMessage(MessagesDefault.error);
    console.error(err);
  }
}
