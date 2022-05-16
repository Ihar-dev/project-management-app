import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

const BTN_TEXT_DEFAULT = 'submit';

const COLOR_DEFAULT = 'primary';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() text = BTN_TEXT_DEFAULT;

  @Input() isDisabled = false;

  @Input() color = COLOR_DEFAULT;
}
