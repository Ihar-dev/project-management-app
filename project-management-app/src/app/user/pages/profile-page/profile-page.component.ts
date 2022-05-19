import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ReplaySubject, takeUntil, timer } from 'rxjs';
import { TUserData } from 'src/app/shared/models/register-data.model';
import { User } from 'src/app/shared/models/user.model';
import { selectProfile } from 'src/app/store/selectors/auth.selector';
import { MatDialog } from '@angular/material/dialog';
import { UsersAction, UsersActions } from 'src/app/store/actions/users.action';
import { Actions, ofType } from '@ngrx/effects';
import { IPopupData, PopupComponent } from 'src/app/core/components/popup/popup.component';
import {
  DialogConfirmationComponent,
  DialogData,
} from '../../../core/components/dialog-confirmation/dialog-confirmation.component';

const DELETE_ACCOUNT_QUESTION = 'Delete account';
const DELETE_CONFIRM = 'Once you confirm, all of your account data will be permanently deleted.';
const UPDATE_TITLE = 'Your data has been successfully updated.';
const UPDATE_BTN_TEXT = 'Ok';
const UPDATE_POPUP_DELAY = 2000;

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject<boolean>(1);

  profile$ = this.store.select(selectProfile);

  profile: User | null = null;

  constructor(private store: Store, private readonly dialog: MatDialog, private updates$: Actions) {
    this.updates$
      .pipe(ofType(UsersAction.PutUserSuccess), takeUntil(this.destroyed$))
      .subscribe(() => {
        this.openDialogUpdate();
      });
  }

  ngOnInit(): void {
    this.profile$.pipe(takeUntil(this.destroyed$)).subscribe((userData) => {
      this.profile = userData;
    });
  }

  onUpdateData(userData: TUserData): void {
    if (!this.profile) {
      return;
    }
    this.store.dispatch(UsersActions.putUser({ data: userData, id: this.profile.id }));
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
          this.store.dispatch(UsersActions.deleteUser({ id: this.profile.id }));
        }
      });
  }

  private openDialogUpdate(): void {
    const dialogTimer = timer(UPDATE_POPUP_DELAY);
    const dialogRef = this.dialog.open(PopupComponent, {
      data: <IPopupData>{
        title: UPDATE_TITLE,
        isCancelBtn: false,
        isSuccessImg: true,
        btnSubmitText: UPDATE_BTN_TEXT,
      },
    });

    dialogTimer.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      dialogRef.close();
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
