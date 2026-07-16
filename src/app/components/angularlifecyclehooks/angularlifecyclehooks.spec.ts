import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Angularlifecyclehooks } from './angularlifecyclehooks';

describe('Angularlifecyclehooks', () => {
  let component: Angularlifecyclehooks;
  let fixture: ComponentFixture<Angularlifecyclehooks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Angularlifecyclehooks],
    }).compileComponents();

    fixture = TestBed.createComponent(Angularlifecyclehooks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
