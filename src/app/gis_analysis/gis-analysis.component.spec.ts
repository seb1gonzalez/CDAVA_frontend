import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GisAnalysisComponent } from './gis-analysis.component';

describe('GisAnalisysComponent', () => {
  let component: GisAnalysisComponent;
  let fixture: ComponentFixture<GisAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GisAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GisAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
