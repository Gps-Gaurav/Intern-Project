import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertFinishedGoodsComponent } from './insert-op-stock-finished-goods.component';

describe('InsertFinishedGoodsComponent', () => {
  let component: InsertFinishedGoodsComponent;
  let fixture: ComponentFixture<InsertFinishedGoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertFinishedGoodsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertFinishedGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
