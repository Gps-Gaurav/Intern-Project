import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sale_Detail_InvoicesComponent } from './Sale_Detail_Invoices.component';

describe('PurchaseComponent', () => {
  let component: Sale_Detail_InvoicesComponent;
  let fixture: ComponentFixture<Sale_Detail_InvoicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Sale_Detail_InvoicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Sale_Detail_InvoicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
