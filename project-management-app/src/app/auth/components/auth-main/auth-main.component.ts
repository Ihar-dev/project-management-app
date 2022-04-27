import { Component, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-auth-main',
  templateUrl: './auth-main.component.html',
  styleUrls: ['./auth-main.component.scss'],
})
export class AuthMainComponent implements OnDestroy {
  constructor(private renderer: Renderer2) {
    this.renderer.addClass(document.body, 'purple-bg');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'purple-bg');
  }
}
