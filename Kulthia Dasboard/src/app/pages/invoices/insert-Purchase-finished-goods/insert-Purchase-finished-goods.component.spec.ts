import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertPurchaseFinishedGoodsComponent } from './insert-Purchase-finished-goods.component';

describe('InsertFinishedGoodsComponent', () => {
  let component: InsertPurchaseFinishedGoodsComponent;
  let fixture: ComponentFixture<InsertPurchaseFinishedGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InsertPurchaseFinishedGoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertPurchaseFinishedGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
