import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldPasswordComponent } from './form-field-password.component';

describe('FormFieldPasswordComponent', () => {
  let component: FormFieldPasswordComponent;
  let fixture: ComponentFixture<FormFieldPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormFieldPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
