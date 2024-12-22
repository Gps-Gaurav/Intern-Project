import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertTBLUNITMASTERComponent } from './insert-tbl-unit-master.component';

describe('InsertTBLUNITMASTERComponent', () => {
  let component: InsertTBLUNITMASTERComponent;
  let fixture: ComponentFixture<InsertTBLUNITMASTERComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertTBLUNITMASTERComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertTBLUNITMASTERComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
