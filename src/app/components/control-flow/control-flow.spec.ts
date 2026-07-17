import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlFlow } from './control-flow';

describe('ControlFlow', () => {
  let component: ControlFlow;
  let fixture: ComponentFixture<ControlFlow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlFlow],
    }).compileComponents();

    fixture = TestBed.createComponent(ControlFlow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
