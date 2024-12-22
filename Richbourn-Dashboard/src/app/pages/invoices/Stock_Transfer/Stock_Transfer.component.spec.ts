import { ComponentFixture, TestBed } from '@angular/core/testing';

import {Stock_TransferComponent } from './Stock_Transfer.component';

describe('PurchaseComponent', () => {
  let component: Stock_TransferComponent;
  let fixture: ComponentFixture<Stock_TransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Stock_TransferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Stock_TransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
