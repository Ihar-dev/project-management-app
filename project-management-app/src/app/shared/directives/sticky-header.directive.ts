import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

const START_POSITION = 0;
const CLASS = 'sticky';
const html = document.querySelector('html');

@Directive({
  selector: '[appStickyHeader]',
})
export class StickyHeaderDirective {
  scrollY = START_POSITION;

  constructor(private element: ElementRef, private render: Renderer2) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.setScrollY();
    this.changeClass();
  }

  changeClass(): void {
    if (this.scrollY || this.htmlTopValue) {
      this.render.addClass(this.element.nativeElement, CLASS);
    } else {
      this.render.removeClass(this.element.nativeElement, CLASS);
    }
  }

  setScrollY(): void {
    this.scrollY = window.scrollY;
  }

  get htmlTopValue(): string {
    return html?.style.top || '';
  }
}
