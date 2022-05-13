import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReplaySubject, takeUntil } from 'rxjs';
import { TUserData } from 'src/app/shared/models/register-data.model';
import { User } from 'src/app/shared/models/user.model';
import { loginSuccess, logout } from 'src/app/store/actions/auth.action';
import { selectProfile } from 'src/app/store/selectors/auth.selector';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import {
  DialogConfirmationComponent,
  DialogData,
} from '../../../core/components/dialog-confirmation/dialog-confirmation.component';

const DELETE_ACCOUNT_QUESTION = 'Delete account';
const DELETE_CONFIRM = 'Once you confirm, all of your account data will be permanently deleted.';
@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject<boolean>(1);

  profile$ = this.store.select(selectProfile);

  profile: User | null = null;

  constructor(
    private store: Store,
    private userService: UserService,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.profile$.pipe(takeUntil(this.destroyed$)).subscribe((userData) => {
      this.profile = userData;
    });
  }

  onUpdateData(userData: TUserData): void {
    if (!this.profile) {
      return;
    }
    this.userService
      .updateUser(userData, this.profile.id)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((user) => this.store.dispatch(loginSuccess({ user })));
  }

  onDelete(): void {
    if (!this.profile) {
      return;
    }
    const dialogRef = this.dialog.open(DialogConfirmationComponent, {
      data: <DialogData>{
        h2: this.deleteConfirmQues,
        p: this.deleteConfirm,
      },
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result: Response) => {
        if (result && this.profile) {
          this.userService
            .deleteUser(this.profile.id)
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
              this.store.dispatch(logout());
            });
        }
      });
  }

  private get deleteConfirmQues(): string {
    return `${DELETE_ACCOUNT_QUESTION} ${this.profile?.name}?`;
  }

  private get deleteConfirm(): string {
    return DELETE_CONFIRM;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
