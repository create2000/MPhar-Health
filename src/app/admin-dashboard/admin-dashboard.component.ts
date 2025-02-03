import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HealthIssueService } from '../health-issue.service';
import { HealthIssue } from '../health-issue.model';
import { HealthProfessionalsService } from '../health-professionals.service'; // Import HealthProfessionalService
import { HealthProfessional } from '../health-professional.model'; // Import HealthProfessional model (or your type)
import { Observable } from 'rxjs';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    standalone: false,
    styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  userName: string | null = null;
  healthIssues$: Observable<HealthIssue[]> | undefined; // Use Observable and undefined
  healthProfessionals$: Observable<HealthProfessional[]> | undefined; // Use Observable and undefined
  selectedHealthProfessional: { [key: number]: number | null } = {};

    constructor(
        private authService: AuthService,
        private healthIssueService: HealthIssueService,
        private healthProfessionalsService: HealthProfessionalsService // Inject the service
    ) { }

    ngOnInit(): void {
        this.userName = this.authService.getUserName();

        this.loadData(); // Call a function to load data (good practice)
    }
    loadData() {
      this.healthIssues$ = this.healthIssueService.getAllHealthIssues(); // Assign the Observable
      this.healthProfessionals$ = this.healthProfessionalsService.getAllHealthProfessionals(); // Assign the Observable
  }

  assignHealthIssue(healthIssueId: number): void {
    const healthProfessionalId = this.selectedHealthProfessional[healthIssueId];
    if (healthProfessionalId) {
        this.healthIssueService.assignHealthIssue(healthIssueId, healthProfessionalId).subscribe({
            next: () => {
                this.healthIssues$ = this.healthIssueService.getAllHealthIssues(); // Refresh using Observable
            },
            error: (error) => {
                console.error("Error assigning health issue:", error);
            }
        });
    } else {
        console.warn("No health professional selected for assignment.");
    }

  }
}