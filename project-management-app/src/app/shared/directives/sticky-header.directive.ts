import { Directive, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 1,
};

@Directive({
  selector: '[appStickyHeader]',
})
export class StickyHeaderDirective implements AfterViewInit {
  constructor(private element: ElementRef, private render: Renderer2) {}

  ngAfterViewInit(): void {
    const anchor = this.render.createElement('div');
    this.render.insertBefore(
      this.render.parentNode(this.element.nativeElement),
      anchor,
      this.element.nativeElement,
    );

    const intersectionHandler: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[],
    ) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.render.removeClass(this.element.nativeElement, 'sticky');
        } else {
          this.render.addClass(this.element.nativeElement, 'sticky');
        }
      });
    };

    const observer = new IntersectionObserver(intersectionHandler, options);

    observer.observe(anchor);
  }
}
