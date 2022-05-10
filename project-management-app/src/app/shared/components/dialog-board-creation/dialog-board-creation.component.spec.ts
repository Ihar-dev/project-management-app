import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBoardCreationComponent } from './dialog-board-creation.component';

describe('DialogBoardCreationComponent', () => {
  let component: DialogBoardCreationComponent;
  let fixture: ComponentFixture<DialogBoardCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogBoardCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogBoardCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
