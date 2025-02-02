import { Component, OnInit } from '@angular/core';
import { HealthcareService } from '../healthcare.service';
import { AuthService } from '../auth.service';  // Assuming you have AuthService to get logged-in user

// Define the structure of a recommendation
interface Recommendation {
  id: string;
  text: string;
  completed: boolean;
}

// Define the structure of the user object
interface User {
  id: string;
  fullname: string;
}

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  standalone: false,
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {
  recommendations: Recommendation[] = []; // Explicitly set the type
  patientId: string | null = null; // Store the patient's ID

  constructor(
    private healthcareService: HealthcareService,
    private authService: AuthService  // Inject AuthService to get user data
  ) { }

  ngOnInit() {
    // Fetch logged-in patient ID dynamically
    this.authService.getUser().subscribe((user: User | null) => {
      if (user) {
        this.patientId = user.id; // Assume user object has an 'id' field
        this.fetchRecommendations();
      }
    });
  }

  fetchRecommendations() {
    if (this.patientId) {
      this.healthcareService.getRecommendations(this.patientId)
        .subscribe({
          next: (data: Recommendation[]) => {
            this.recommendations = data;
          },
          error: (err) => {
            console.error('Error fetching recommendations:', err);
          }
        });
    }
  }

  updateRecommendationStatus(recommendation: Recommendation) {
    recommendation.completed = !recommendation.completed; // Toggle status
    this.healthcareService.submitRecommendationStatus(recommendation.id, recommendation.completed)
      .subscribe({
        next: () => {
          console.log('Recommendation status updated');
        },
        error: (err) => {
          console.error('Error updating recommendation status:', err);
        }
      });
  }
}
