import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuth } from 'src/app/store/selectors/auth.selector';

const OPEN_CLASS = 'active';
const PAGE_WITH_TRANSPARENT_HEADER = ['/welcome', '/auth/signup', '/auth/login'];

@Component({
  selector: 'app-open-navigation',
  templateUrl: './open-navigation.component.html',
  styleUrls: ['./open-navigation.component.scss'],
})
export class OpenNavigationComponent implements OnInit {
  currentElement!: HTMLElement;

  isAuth$ = this.store.select(selectIsAuth);

  constructor(
    private render: Renderer2,
    private element: ElementRef,
    private router: Router,
    private store: Store,
  ) {}

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

  get hiddenElement(): boolean {
    return PAGE_WITH_TRANSPARENT_HEADER.some((url) => url === this.router.url);
  }
}
