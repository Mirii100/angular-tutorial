import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Routeguards } from './routeguards';

describe('Routeguards', () => {
  let component: Routeguards;
  let fixture: ComponentFixture<Routeguards>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Routeguards],
    }).compileComponents();

    fixture = TestBed.createComponent(Routeguards);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
