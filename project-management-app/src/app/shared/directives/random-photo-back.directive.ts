import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

import { PHOTOS } from '../models/background-photos.model';

@Directive({
  selector: '[appRandomPhotoBack]'
})
export class RandomPhotoBackDirective implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.el = el;
  }

  ngOnInit(): void {
    const position = Math.floor(Math.random() * PHOTOS.length);
    const {url} = PHOTOS[position];
    const backGroundImage = `url(${url})`;
    this.renderer.setStyle(this.el.nativeElement, 'background-image', backGroundImage);
  }
}
