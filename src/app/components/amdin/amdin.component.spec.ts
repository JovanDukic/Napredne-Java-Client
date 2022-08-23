import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmdinComponent } from './amdin.component';

describe('AmdinComponent', () => {
  let component: AmdinComponent;
  let fixture: ComponentFixture<AmdinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AmdinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmdinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
