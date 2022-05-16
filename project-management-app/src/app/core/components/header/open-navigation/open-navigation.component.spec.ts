import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenNavigationComponent } from './open-navigation.component';

describe('OpenNavigationComponent', () => {
  let component: OpenNavigationComponent;
  let fixture: ComponentFixture<OpenNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
