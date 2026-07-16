import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularHttpclientsComponent } from './angular-httpclients-component';

describe('AngularHttpclientsComponent', () => {
  let component: AngularHttpclientsComponent;
  let fixture: ComponentFixture<AngularHttpclientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AngularHttpclientsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AngularHttpclientsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
