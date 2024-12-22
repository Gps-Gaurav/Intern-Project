import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpSTOCKComponent } from './OpStock.component';

describe('OpSTOCKComponent', () => {
  let component: OpSTOCKComponent;
  let fixture: ComponentFixture<OpSTOCKComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpSTOCKComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpSTOCKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
