import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { ITask } from 'src/app/shared/models/task.model';

@Directive({
  selector: '[appGetUserName]',
})
export class GetUserNameDirective implements OnInit {
  @Input() public appGetUserName: ITask | null;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.el = el;
  }

  ngOnInit(): void {
    const div = this.renderer.createElement('div');
    const divText = this.renderer.createText('User Name');
    this.renderer.appendChild(div, divText);
    this.renderer.appendChild(this.el.nativeElement, div);


  }
}
