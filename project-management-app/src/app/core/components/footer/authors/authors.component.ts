import { Component } from '@angular/core';

interface Author {
  name: string;
  link: string;
}

const AUTHORS: Author[] = [
  {
    name: 'tetianaMas',
    link: 'https://github.com/tetianaMas',
  },
  {
    name: 'Ihar-dev',
    link: 'https://github.com/Ihar-dev',
  },
  {
    name: 'irnq',
    link: 'https://github.com/irnq',
  },
];

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent {
  get authorList(): Author[] {
    return AUTHORS;
  }
}
