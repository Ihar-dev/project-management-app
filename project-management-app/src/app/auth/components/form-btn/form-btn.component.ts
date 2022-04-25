import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-btn',
  templateUrl: './form-btn.component.html',
  styleUrls: ['./form-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormBtnComponent {
  @Input() text = '';

  @Input() isDisabled = false;
}
