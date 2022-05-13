import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form-submit',
  templateUrl: './form-submit.component.html',
  styleUrls: ['./form-submit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormSubmitComponent {}
