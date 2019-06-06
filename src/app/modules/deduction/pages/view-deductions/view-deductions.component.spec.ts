import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeductionsComponent } from './view-deductions.component';

describe('ViewDeductionsComponent', () => {
  let component: ViewDeductionsComponent;
  let fixture: ComponentFixture<ViewDeductionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDeductionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeductionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
