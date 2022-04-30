import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss'],
})
export class CreateButtonComponent implements OnInit {
  windowWidth = 1920;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.windowWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
  }

  checkMobile(): boolean {
    return this.windowWidth <= 480;
  }
}
