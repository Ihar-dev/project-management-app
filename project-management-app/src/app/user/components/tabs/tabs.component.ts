import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TUserData } from 'src/app/shared/models/register-data.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
  @Input() profile: User | null = null;

  @Output() updateData = new EventEmitter<TUserData>();

  onSubmitForm(data: TUserData) {
    this.updateData.emit(data);
  }
}
