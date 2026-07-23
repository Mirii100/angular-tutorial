import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularSignal } from './angular-signal';

describe('AngularSignal', () => {
  let component: AngularSignal;
  let fixture: ComponentFixture<AngularSignal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularSignal],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularSignal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
