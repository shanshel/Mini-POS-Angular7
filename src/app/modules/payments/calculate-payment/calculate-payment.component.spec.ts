import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatePaymentComponent } from './calculate-payment.component';

describe('CalculatePaymentComponent', () => {
  let component: CalculatePaymentComponent;
  let fixture: ComponentFixture<CalculatePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
