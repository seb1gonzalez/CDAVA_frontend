import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrashTypingComponent } from './crash-typing.component';

describe('CrashTypingComponent', () => {
  let component: CrashTypingComponent;
  let fixture: ComponentFixture<CrashTypingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrashTypingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrashTypingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
