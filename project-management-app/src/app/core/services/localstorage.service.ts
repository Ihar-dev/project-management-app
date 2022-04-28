import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  getItem<T>(key: string): T | null {
    try {
      const res = localStorage.getItem(key);
      if (res) {
        return <T>JSON.parse(res);
      }
    } catch (err) {
      console.error(err);
    }

    return null;
  }

  setItem<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
