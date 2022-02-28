import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountermeasuresComponent } from './countermeasures.component';

describe('CountermeasuresComponent', () => {
  let component: CountermeasuresComponent;
  let fixture: ComponentFixture<CountermeasuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountermeasuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountermeasuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
