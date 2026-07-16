import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Angularpipes } from './angularpipes';

describe('Angularpipes', () => {
  let component: Angularpipes;
  let fixture: ComponentFixture<Angularpipes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Angularpipes],
    }).compileComponents();

    fixture = TestBed.createComponent(Angularpipes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
