import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubDepartmentsViewComponent } from './departments-view.component';

describe('DepartmentsViewComponent', () => {
  let component: SubDepartmentsViewComponent;
  let fixture: ComponentFixture<SubDepartmentsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubDepartmentsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubDepartmentsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
