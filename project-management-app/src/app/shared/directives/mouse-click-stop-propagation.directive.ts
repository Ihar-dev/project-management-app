import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMouseClickStopPropagation]'
})
export class MouseClickStopPropagationDirective {
  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    event.stopImmediatePropagation();
  }
}
