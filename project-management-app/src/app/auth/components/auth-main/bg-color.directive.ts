import { AfterViewInit, Directive, Input, OnDestroy, Renderer2 } from '@angular/core';
import { BackgroundColor } from '../../shared/constants';

@Directive({
  selector: '[appBgColor]',
})
export class BgColorDirective implements AfterViewInit, OnDestroy {
  @Input('appBgColor') color: BackgroundColor = BackgroundColor.white;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (!this.color) return;

    this.renderer.addClass(document.body, this.color);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, this.color);
  }
}
