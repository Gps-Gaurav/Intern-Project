import { ComponentFixture, TestBed } from '@angular/core/testing';

import {PacketComponent } from './packet.component';

describe('PartyComponent', () => {
  let component: PacketComponent;
  let fixture: ComponentFixture<PacketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PacketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
