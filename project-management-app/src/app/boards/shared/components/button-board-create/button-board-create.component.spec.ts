import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonBoardCreateComponent } from './button-board-create.component';

describe('ButtonBoardCreateComponent', () => {
  let component: ButtonBoardCreateComponent;
  let fixture: ComponentFixture<ButtonBoardCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonBoardCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonBoardCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
