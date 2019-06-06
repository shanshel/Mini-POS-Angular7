import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableViewPageComponent } from './reusable-view-page.component';

describe('ReusableViewPageComponent', () => {
  let component: ReusableViewPageComponent;
  let fixture: ComponentFixture<ReusableViewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReusableViewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
