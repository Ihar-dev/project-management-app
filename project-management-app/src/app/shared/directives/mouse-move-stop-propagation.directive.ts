import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMouseMoveStopPropagation]'
})
export class MouseMoveStopPropagationDirective {
  @HostListener('mousemove', ['$event'])
  public onMouseMove(event: Event): void {
    event.stopImmediatePropagation();
  }
}
