import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllowancesComponent } from './view-allowances.component';

describe('ViewAllowancesComponent', () => {
  let component: ViewAllowancesComponent;
  let fixture: ComponentFixture<ViewAllowancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAllowancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAllowancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
