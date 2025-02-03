import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HealthIssueService } from '../health-issue.service'; // Import HealthIssueService
import { HealthIssue } from '../health-issue.model'; // Import HealthIssue model

@Component({
  selector: 'app-health-dashboard',
  templateUrl: './health-dashboard.component.html',
  standalone: false,
  styleUrls: ['./health-dashboard.component.css']
})
export class HealthDashboardComponent implements OnInit {
  user: any;
  healthIssues: HealthIssue[] = [];
  recommendationText: { [key: number]: string } = {};
  healthProfessionalId: number | undefined;

  constructor(private authService: AuthService, private router: Router, private healthIssueService: HealthIssueService) { } // Inject HealthIssueService

  ngOnInit(): void {
    this.checkUserRole();
  }

  checkUserRole(): void {
    const userRole = this.authService.getUserRole();

    if (userRole !== 'Health Professional') {
      this.router.navigate(['/login']);
    } else {
      this.user = this.authService.getUserDetails(); // Fetch user data if needed

        this.authService.loggedInUserId$.subscribe(userId => {
                this.healthProfessionalId = userId ? +userId : undefined;

                if (this.healthProfessionalId) {
                    this.healthIssueService.getHealthIssuesByHealthProfessionalId(this.healthProfessionalId).subscribe(issues => {
                        this.healthIssues = issues;
                    });
                }
            });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

    addRecommendation(healthIssueId: number): void {
        const recommendation = this.recommendationText[healthIssueId];
        this.healthIssueService.addRecommendation(healthIssueId, recommendation).subscribe(() => {
          // Refresh the health issues list
            this.healthIssueService.getHealthIssuesByHealthProfessionalId(this.healthProfessionalId!).subscribe(issues => {
                this.healthIssues = issues;
            });
        });
    }
}