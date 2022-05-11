import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReplaySubject, takeUntil } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { selectProfile } from 'src/app/store/selectors/auth.selector';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject<boolean>(1);

  profile$ = this.store.select(selectProfile);

  profile: User | null = null;

  constructor(private store: Store, private userService: UserService) {}

  ngOnInit(): void {
    this.profile$.pipe(takeUntil(this.destroyed$)).subscribe((userData) => {
      this.profile = userData;
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
