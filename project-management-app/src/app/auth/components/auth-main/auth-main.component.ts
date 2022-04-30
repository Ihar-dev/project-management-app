import { Component } from '@angular/core';
import { BackgroundColor } from '../../shared/constants';

const BG_COLOR = BackgroundColor.purple;
@Component({
  selector: 'app-auth-main',
  templateUrl: './auth-main.component.html',
  styleUrls: ['./auth-main.component.scss'],
})
export class AuthMainComponent {
  bgColor = BG_COLOR;
}
