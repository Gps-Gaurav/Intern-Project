import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseComponent } from './Purchase.component';

describe('PurchaseComponent', () => {
  let component: PurchaseComponent;
  let fixture: ComponentFixture<PurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
