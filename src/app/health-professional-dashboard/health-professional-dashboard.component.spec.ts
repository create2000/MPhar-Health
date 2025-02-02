import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthProfessionalDashboardComponent } from './health-professional-dashboard.component';

describe('HealthProfessionalDashboardComponent', () => {
  let component: HealthProfessionalDashboardComponent;
  let fixture: ComponentFixture<HealthProfessionalDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HealthProfessionalDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HealthProfessionalDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
