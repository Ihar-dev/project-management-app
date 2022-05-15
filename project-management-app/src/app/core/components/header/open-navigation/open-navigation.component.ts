import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

const OPEN_CLASS = 'active';

@Component({
  selector: 'app-open-navigation',
  templateUrl: './open-navigation.component.html',
  styleUrls: ['./open-navigation.component.scss'],
})
export class OpenNavigationComponent implements OnInit {
  currentElement!: HTMLElement;
  constructor(private render: Renderer2, private element: ElementRef) {}

  ngOnInit(): void {
    this.currentElement = this.element.nativeElement;
  }

  rotateOpen(): void {
    if (this.currentElement.classList.contains(OPEN_CLASS)) {
      this.render.removeClass(this.currentElement, OPEN_CLASS);
    } else {
      this.render.addClass(this.currentElement, OPEN_CLASS);
    }
  }
}
