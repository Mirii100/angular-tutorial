import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalRendering } from './conditional-rendering';

describe('ConditionalRendering', () => {
  let component: ConditionalRendering;
  let fixture: ComponentFixture<ConditionalRendering>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionalRendering],
    }).compileComponents();

    fixture = TestBed.createComponent(ConditionalRendering);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
