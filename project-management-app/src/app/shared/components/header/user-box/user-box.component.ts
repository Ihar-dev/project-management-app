import { Component } from '@angular/core';

@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.scss'],
})
export class UserBoxComponent {
  logout(): void {
    // method for wipe user token /  logout / redirect to login-page
    console.log('dont forget implement logout!');
  }
}
