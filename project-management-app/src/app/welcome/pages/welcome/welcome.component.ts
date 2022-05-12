import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectIsAuth } from 'src/app/store/selectors/auth.selector';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  public pageActivation = false;

  isAuth$ = this.store.select(selectIsAuth);

  constructor(private store: Store) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.pageActivation = true;
    });
  }
}
