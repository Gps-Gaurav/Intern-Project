import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitRelationComponent } from './unit_relation.component';

describe('SeriesComponent', () => {
  let component: UnitRelationComponent;
  let fixture: ComponentFixture<UnitRelationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitRelationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitRelationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
