import { Directive, ElementRef, OnInit } from '@angular/core';

import { PHOTOS } from '../models/background-photos.model';

@Directive({
  selector: '[appRandomPhotoBack]'
})
export class RandomPhotoBackDirective implements OnInit {

  constructor(private el: ElementRef) {
    this.el = el;
  }

  ngOnInit(): void {
    const position = Math.floor(Math.random() * PHOTOS.length);
    const {url} = PHOTOS[position];
    this.el.nativeElement.style.backgroundImage = `url(${url})`;
  }
}
