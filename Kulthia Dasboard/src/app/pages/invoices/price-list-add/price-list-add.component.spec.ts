import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PRICELISTADDComponent } from './price-list-add.component';

describe('PRICELISTADDComponent', () => {
  let component: PRICELISTADDComponent;
  let fixture: ComponentFixture<PRICELISTADDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PRICELISTADDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PRICELISTADDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
