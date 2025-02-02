import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomReportComponent } from './symptom-report.component';

describe('SymptomReportComponent', () => {
  let component: SymptomReportComponent;
  let fixture: ComponentFixture<SymptomReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SymptomReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymptomReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
