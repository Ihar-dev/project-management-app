import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ReplaySubject, takeUntil } from 'rxjs';
import { PopupComponent } from 'src/app/core/components/popup/popup.component';
import { TOKEN_EXP_QUERY_KEY } from 'src/app/shared/constants';
import { AuthService } from 'src/app/shared/services/auth.service';
import { logout } from 'src/app/store/actions/auth.action';
import { selectIsAuth } from 'src/app/store/selectors/auth.selector';

const DIALOG_TITLE = 'Your session has expired.';
const DIALOG_SUBTITLE = 'Please login.';
const DIALOG_BTN_CANCEL = 'Cancel';
const DIALOG_BTN_SUBMIT = 'Log in';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  private destroyed$ = new ReplaySubject<boolean>(1);

  public pageActivation = false;

  isAuth$ = this.store.select(selectIsAuth);

  constructor(
    private store: Store,
    private authService: AuthService,
    private route: ActivatedRoute,
    private readonly router: Router,
    private readonly dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.authService.isUserAuthenticated();
    setTimeout(() => {
      this.pageActivation = true;
    });
    this.route.queryParams
      .pipe(takeUntil(this.destroyed$))
      .subscribe(({ [TOKEN_EXP_QUERY_KEY]: token }) => token && this.openTokenExpDialog());
  }

  private openTokenExpDialog() {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: {
        title: DIALOG_TITLE,
        subtitle: DIALOG_SUBTITLE,
        isCancelBtn: true,
        isSuccessImg: false,
        btnCancelText: DIALOG_BTN_CANCEL,
        btnSubmitText: DIALOG_BTN_SUBMIT,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.router.navigate(['auth', 'login'], { queryParams: {} });
      } else {
        this.router.navigate(['welcome'], { queryParams: {} });
      }
    });
  }

  onLogout(): void {
    this.store.dispatch(logout());
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
