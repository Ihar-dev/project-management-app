import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/shared/material.module';

import { UserBoxComponent } from './user-box.component';

describe('UserBoxComponent', () => {
  let component: UserBoxComponent;
  let fixture: ComponentFixture<UserBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserBoxComponent],
      imports: [MaterialModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
