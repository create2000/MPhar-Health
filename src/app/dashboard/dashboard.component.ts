import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';  // Import MatSnackBar

import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { HealthIssueService } from '../health-issue.service';

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
  recommendation: string | null = null;  // For storing recommendation

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private healthIssueService: HealthIssueService,
    private snackBar: MatSnackBar  // Inject MatSnackBar
  ) {
    this.healthIssueForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      attachment: [null]
    });
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.userName = this.authService.getUserName();
  }

  toggleForm() {
    this.formVisible = !this.formVisible;
  }

  onSubmit() {
    if (this.healthIssueForm.valid) {
      const formData = this.healthIssueForm.value;
      this.healthIssueService.submitHealthIssue(formData).subscribe(
        response => {
          // Show success message
          this.snackBar.open('Your health issue has been submitted successfully!', 'Close', {
            duration: 3000,  // Duration of the alert
          });

          // Check if a recommendation was returned
          if (response.recommendation) {
            this.recommendation = response.recommendation;
          }

          // Reset form after submission
          this.healthIssueForm.reset();

          // Redirect to homepage after a short delay
          setTimeout(() => {
            this.router.navigate(['/']);  // Navigate to the homepage
          }, 2000); // Redirect delay (optional)
        },
        error => {
          // Handle any error during submission
          console.error('Error submitting health issue:', error);
        }
      );
    }
  }
}
