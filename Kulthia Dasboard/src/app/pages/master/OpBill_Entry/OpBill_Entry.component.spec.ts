import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpBILL_ENTRYComponent } from './OpBill_Entry.component';

describe('OpBILL_ENTRYComponent', () => {
  let component: OpBILL_ENTRYComponent;
  let fixture: ComponentFixture<OpBILL_ENTRYComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpBILL_ENTRYComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpBILL_ENTRYComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
