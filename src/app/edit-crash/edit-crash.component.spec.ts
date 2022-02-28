import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCrashComponent } from './edit-crash.component';

describe('EditCrashComponent', () => {
  let component: EditCrashComponent;
  let fixture: ComponentFixture<EditCrashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCrashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
