import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

const BTN_TEXT_DEFAULT = 'Submit';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() text = BTN_TEXT_DEFAULT;

  @Input() isDisabled = false;
}
