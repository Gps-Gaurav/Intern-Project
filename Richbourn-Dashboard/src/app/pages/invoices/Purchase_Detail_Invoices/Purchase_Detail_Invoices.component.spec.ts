import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Purchase_Detail_InvoicesComponent } from './Purchase_Detail_Invoices.component';

describe('PurchaseComponent', () => {
  let component: Purchase_Detail_InvoicesComponent;
  let fixture: ComponentFixture<Purchase_Detail_InvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Purchase_Detail_InvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Purchase_Detail_InvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
