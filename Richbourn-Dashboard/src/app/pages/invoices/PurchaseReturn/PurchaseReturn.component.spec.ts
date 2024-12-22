import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PurchaseReturnComponent } from './PurchaseReturn.component';



describe('PartyComponent', () => {
  let component: PurchaseReturnComponent;
  let fixture: ComponentFixture<PurchaseReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseReturnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
