import { Component, OnInit, HostListener } from '@angular/core';

const DEFAULT_WIDTH = 1920;
const SMALL_WIDTH = 480;

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.scss'],
})
export class CreateButtonComponent implements OnInit {
  windowWidth = DEFAULT_WIDTH;

  @HostListener('window:resize')
  onResize(): void {
    this.windowWidth = window.innerWidth;
  }

  ngOnInit(): void {
    this.windowWidth = window.innerWidth;
  }

  checkMobile(): boolean {
    return this.windowWidth <= SMALL_WIDTH;
  }
}
