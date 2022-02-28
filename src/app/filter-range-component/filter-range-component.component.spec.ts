import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRangeComponentComponent } from './filter-range-component.component';

describe('FilterRangeComponentComponent', () => {
  let component: FilterRangeComponentComponent;
  let fixture: ComponentFixture<FilterRangeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterRangeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterRangeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
