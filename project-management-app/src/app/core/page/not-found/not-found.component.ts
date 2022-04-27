import { Component } from '@angular/core';

const IMG = 'url(/assets/pictures/page-404.jpg)';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
})
export class NotFoundComponent {
  get sourceImg(): string {
    return IMG;
  }
}
