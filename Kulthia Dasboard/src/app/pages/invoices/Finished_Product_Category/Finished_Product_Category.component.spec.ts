import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Finished_Product_CategoryComponent  } from './Finished_Product_Category.component';

describe('SeriesComponent', () => {
  let component: Finished_Product_CategoryComponent ;
  let fixture: ComponentFixture<Finished_Product_CategoryComponent >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Finished_Product_CategoryComponent  ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Finished_Product_CategoryComponent );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
