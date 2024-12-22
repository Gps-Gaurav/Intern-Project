import { ComponentFixture, TestBed } from '@angular/core/testing';

import {Sales_RawComponent } from './Sales_Raw.component';

describe('PartyComponent', () => {
  let component:Sales_RawComponent;
  let fixture: ComponentFixture<Sales_RawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sales_RawComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sales_RawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
