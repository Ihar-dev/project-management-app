import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreationComponent } from './dialog-creation.component';

describe('DialogCreationComponent', () => {
  let component: DialogCreationComponent;
  let fixture: ComponentFixture<DialogCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
