import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Purchase_RawComponent} from './Purchase_Raw.component';

describe('PurchaseComponent', () => {
  let component: Purchase_RawComponent;
  let fixture: ComponentFixture<Purchase_RawComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Purchase_RawComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Purchase_RawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
