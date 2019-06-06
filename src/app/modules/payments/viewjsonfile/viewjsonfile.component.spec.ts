import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewjsonfileComponent } from './viewjsonfile.component';

describe('ViewjsonfileComponent', () => {
  let component: ViewjsonfileComponent;
  let fixture: ComponentFixture<ViewjsonfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewjsonfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewjsonfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
