import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableChartPageComponent } from './reusable-chart-page.component';

describe('ReusableChartPageComponent', () => {
  let component: ReusableChartPageComponent;
  let fixture: ComponentFixture<ReusableChartPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReusableChartPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableChartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
