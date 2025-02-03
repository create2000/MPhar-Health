import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HealthIssueService } from '../health-issue.service';
import { HealthIssue } from '../health-issue.model'; // Import HealthIssue model

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string | null = null;
  healthIssueForm: FormGroup;
  formVisible: boolean = false;
  recommendation: string | null = null;
  healthIssues: HealthIssue[] = []; // Add healthIssues array
  patientId: number | undefined; // Add patientId

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private healthIssueService: HealthIssueService,
    private snackBar: MatSnackBar
  ) {
    this.healthIssueForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      // attachment: [null]  // If you have attachments, handle them separately
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.userName = this.authService.getUserName();

      this.authService.loggedInUserId$.subscribe(userId => {
        this.patientId = userId ? +userId : undefined;
            if (this.patientId) {
                this.healthIssueService.getHealthIssuesByPatientId(this.patientId).subscribe(issues => {
                    this.healthIssues = issues;
                });
            }
        });
  }

  toggleForm() {
    this.formVisible = !this.formVisible;
  }

  onSubmit() {
    if (this.healthIssueForm.valid) {
      const formData = this.healthIssueForm.value;
      this.healthIssueService.submitHealthIssue(formData).subscribe(
        response => {
          this.snackBar.open('Your health issue has been submitted successfully!', 'Close', {
            duration: 3000,
          });

          this.healthIssueForm.reset();
            if (this.patientId) {
                this.healthIssueService.getHealthIssuesByPatientId(this.patientId).subscribe(issues => {
                    this.healthIssues = issues;
                });
            }
          // No need to redirect immediately, show the health issues instead
        },
        error => {
          console.error('Error submitting health issue:', error);
        }
      );
    }
  }
}