import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalReportsComponent } from './final-reports.component';

describe('FinalReportsComponent', () => {
  let component: FinalReportsComponent;
  let fixture: ComponentFixture<FinalReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
