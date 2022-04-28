import { AfterViewInit, Directive, Input, OnDestroy, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBgColor]',
})
export class BgColorDirective implements AfterViewInit, OnDestroy {
  @Input('appBgColor') cssClass: string = '';

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    if (!this.cssClass) return;

    this.renderer.addClass(document.body, this.cssClass);
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, this.cssClass);
  }
}
