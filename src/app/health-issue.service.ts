import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HealthIssue } from '../app/health-issue.model'; // Import the model

@Injectable({
  providedIn: 'root'
})
export class HealthIssueService {
  private apiUrl = 'http://localhost:5256/api/Illness'; 
  private healthIssueApiUrl = 'https://localhost:5256/api/healthissue'; // New API URL for HealthIssue

  constructor(private http: HttpClient) { }

  submitHealthIssue(formData: any): Observable<any> { // Your existing method
    const illnessData = {
      name: formData.title,
      description: formData.description
    };
    return this.http.post(this.apiUrl, illnessData);
  }

  // New methods (from my previous example)
  getAllHealthIssues(): Observable<HealthIssue[]> {
    return this.http.get<HealthIssue[]>(this.healthIssueApiUrl); // Use the correct URL
  }

  getHealthIssueById(id: number): Observable<HealthIssue> {
    return this.http.get<HealthIssue>(`${this.healthIssueApiUrl}/${id}`); // Use the correct URL
  }

  assignHealthIssue(healthIssueId: number, healthProfessionalId: number): Observable<any> {
    return this.http.post(`${this.healthIssueApiUrl}/assign/${healthIssueId}/${healthProfessionalId}`, {});
  }

  addRecommendation(healthIssueId: number, recommendationText: string): Observable<any> {
    return this.http.post(`${this.healthIssueApiUrl}/recommend/${healthIssueId}`, { recommendationText });
  }

    getHealthIssuesByPatientId(patientId: number): Observable<HealthIssue[]> {
        return this.http.get<HealthIssue[]>(`${this.healthIssueApiUrl}/patient/${patientId}`);
    }

    getHealthIssuesByHealthProfessionalId(healthProfessionalId: number): Observable<HealthIssue[]> {
        return this.http.get<HealthIssue[]>(`${this.healthIssueApiUrl}/healthprofessional/${healthProfessionalId}`);
    }
}