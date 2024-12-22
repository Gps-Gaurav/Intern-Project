import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sale_Raw_Detail_InvoicesComponent } from './Sale_Raw_Detail_Invoices.component';

describe('PurchaseComponent', () => {
  let component: Sale_Raw_Detail_InvoicesComponent;
  let fixture: ComponentFixture<Sale_Raw_Detail_InvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Sale_Raw_Detail_InvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sale_Raw_Detail_InvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
