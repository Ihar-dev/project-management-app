import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

import { ITask } from 'src/app/shared/models/task.model';

@Directive({
  selector: '[appGetUserName]'
})
export class GetUserNameDirective {
  @Input() public appGetUserName: ITask | null;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.el = el;
  }

  ngOnInit(): void {
    this.renderer.setValue(this.el.nativeElement, 'uuu');
  }

}
