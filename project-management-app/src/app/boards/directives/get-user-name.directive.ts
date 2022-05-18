import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { TaskAndUsers } from '../models/task-and-users.model';

@Directive({
  selector: '[appGetUserName]',
})
export class GetUserNameDirective implements OnInit {
  @Input() public appGetUserName: TaskAndUsers;

  constructor(private renderer: Renderer2, private el: ElementRef) {
    this.el = el;
  }

  ngOnInit(): void {
    this.appGetUserName.users.forEach(user => {
      if (user.id === this.appGetUserName.task?.userId) {
        const div = this.renderer.createElement('div');
        const divText = this.renderer.createText(user.name);
        this.renderer.appendChild(div, divText);
        this.renderer.appendChild(this.el.nativeElement, div);
      }
    });
  }


}
