import { Component, DebugElement, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { StickyHeaderDirective } from './sticky-header.directive';

@Component({
  template: ` <div appStickyHeader>test_component</div> `,
})
class TestComponent {
  constructor(public render: Renderer2) {}
}

describe('StickyHeaderDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  let des: DebugElement[];

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [StickyHeaderDirective, TestComponent],
      imports: [BrowserDynamicTestingModule],
    }).createComponent(TestComponent);
    fixture.detectChanges();

    des = fixture.debugElement.queryAll(By.directive(StickyHeaderDirective));
  });

  it('should have element with directive', () => {
    expect(des.length).toBe(1);
  });

  it('should create an instance', () => {
    const directive = new StickyHeaderDirective(
      fixture.elementRef.nativeElement,
      fixture.componentInstance.render,
    );
    expect(directive).toBeTruthy();
  });
});
