import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBoardDeleteComponent } from './button-board-delete.component';

describe('ButtonBoardDeleteComponent', () => {
  let component: ButtonBoardDeleteComponent;
  let fixture: ComponentFixture<ButtonBoardDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonBoardDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonBoardDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
