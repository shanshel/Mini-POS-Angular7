import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReusableCreatePageComponent } from './reusable-create-page.component';

describe('ReusableCreatePageComponent', () => {
  let component: ReusableCreatePageComponent;
  let fixture: ComponentFixture<ReusableCreatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReusableCreatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReusableCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
