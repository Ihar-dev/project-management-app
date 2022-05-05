import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';

const DEFAULT_OPERATION = 'unknown actions';

@Injectable({
  providedIn: 'root',
})
export class EffectsHandlerService {
  handleError(operation = DEFAULT_OPERATION) {
    return () => {
      console.log(`Error with "${operation}"`);
      return EMPTY;
    };
  }
}
