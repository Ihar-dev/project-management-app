import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IPopupData {
  title: string;
  subtitle?: string;
  isCancelBtn: boolean;
  isSuccessImg?: boolean;
  btnCancelText?: string;
  btnSubmitText: string;
}

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IPopupData) {}
}
