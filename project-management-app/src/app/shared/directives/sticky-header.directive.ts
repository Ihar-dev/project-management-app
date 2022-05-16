import { Directive, ElementRef, Renderer2, HostListener, AfterViewInit } from '@angular/core';

const START_POSITION = 0;
const CLASS = 'sticky';
const html = document.querySelector('html');

@Directive({
  selector: '[appStickyHeader]',
})
export class StickyHeaderDirective implements AfterViewInit {
  scrollY = START_POSITION;

  parent!: HTMLElement;

  parentSibling!: HTMLElement;

  constructor(private element: ElementRef, private render: Renderer2) {}

  ngAfterViewInit() {
    this.parent = this.render.parentNode(this.element.nativeElement);
    this.parentSibling = this.render.nextSibling(this.parent);
  }

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
    if (this.htmlTopValue) {
      this.render.addClass(this.parent, CLASS);
      this.render.setStyle(this.parentSibling, 'padding-top', '7rem');
    } else if (this.parent.classList.contains(CLASS)) {
      this.render.removeClass(this.parent, CLASS);
      this.render.removeStyle(this.parentSibling, 'padding-top');
    }
  }

  setScrollY(): void {
    this.scrollY = window.scrollY;
  }

  get htmlTopValue(): string {
    return html?.style.top.replace('-', '') || '';
  }
}
